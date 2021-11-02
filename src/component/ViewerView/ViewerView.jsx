import React,{ useRef, useEffect } from "react";
import AWS from "aws-sdk";
import * as KVSWebRTC from "amazon-kinesis-video-streams-webrtc"

export default function ViewerView({channel}) {
  const videoRef = useRef(null);

  const viewer = {
    signalingClient: null,
    peerConnectionByClientId: {},
    dataChannelByClientId: {},
    localStream: null,
    remoteStreams: [],
    remoteView:null,
    peerConnectionStatsInterval: null,
  };

  const credentials = {
    region: "us-east-2",
    accessKeyId: "AKIATZ6B4KZG2K37YTAD",
    secretAccessKey: "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",
    sessionToken: "",
    endpoint: "https://kinesisvideo.us-east-2.amazonaws.com",
    channelName: channel,
    sendVideo: true,
    clientId: "ZPXJHNQVDW"
  };

  async function startViewer() {
    viewer.remoteView = videoRef.current;

    // Create KVS client
    const kinesisVideoClient = new AWS.KinesisVideo({
      region: credentials.region,
      accessKeyId: credentials.accessKeyId,
      secretAccessKey: credentials.secretAccessKey,
      sessionToken: credentials.sessionToken,
      endpoint: credentials.endpoint,
      correctClockSkew: true,
    });

    // Get signaling channel ARN
    const describeSignalingChannelResponse = await kinesisVideoClient
      .describeSignalingChannel({
        ChannelName: credentials.channelName,
      })
      .promise();
    const channelARN = describeSignalingChannelResponse.ChannelInfo.ChannelARN;
    console.log("[VIEWER] Channel ARN: ", channelARN);

    // Get signaling channel endpoints
    const getSignalingChannelEndpointResponse = await kinesisVideoClient
      .getSignalingChannelEndpoint({
        ChannelARN: channelARN,
        SingleMasterChannelEndpointConfiguration: {
          Protocols: ["WSS", "HTTPS"],
          // Role: KVSWebRTC.Role.VIEWER,
          Role: "VIEWER",
        },
      })
      .promise();
    const endpointsByProtocol =
      getSignalingChannelEndpointResponse.ResourceEndpointList.reduce(
        (endpoints, endpoint) => {
          endpoints[endpoint.Protocol] = endpoint.ResourceEndpoint;
          return endpoints;
        },
        {}
      );
    console.log("[VIEWER] Endpoints: ", endpointsByProtocol);

    const kinesisVideoSignalingChannelsClient =
      new AWS.KinesisVideoSignalingChannels({
        region: credentials.region,
        accessKeyId: credentials.accessKeyId,
        secretAccessKey: credentials.secretAccessKey,
        sessionToken: credentials.sessionToken,
        endpoint: endpointsByProtocol.HTTPS,
        correctClockSkew: true,
      });

    // Get ICE server configuration
    const getIceServerConfigResponse = await kinesisVideoSignalingChannelsClient
      .getIceServerConfig({
        ChannelARN: channelARN,
      })
      .promise();
    const iceServers = [];
      iceServers.push({
        urls: `stun:stun.kinesisvideo.${credentials.region}.amazonaws.com:443`,
      });
    
      getIceServerConfigResponse.IceServerList.forEach((iceServer) =>
        iceServers.push({
          urls: iceServer.Uris,
          username: iceServer.Username,
          credential: iceServer.Password,
        })
      );
    console.log("[VIEWER] ICE servers: ", iceServers);

    // Create Signaling Client
    console.log(KVSWebRTC)
    viewer.signalingClient = new KVSWebRTC.SignalingClient({
      channelARN,
      channelEndpoint: endpointsByProtocol.WSS,
      clientId: credentials.clientId,
      role: KVSWebRTC.Role.VIEWER,
      region: credentials.region,
      credentials: {
        accessKeyId: credentials.accessKeyId,
        secretAccessKey: credentials.secretAccessKey,
        sessionToken: credentials.sessionToken,
      },
      systemClockOffset: kinesisVideoClient.config.systemClockOffset,
    });

    const resolution = { width: { ideal: 1280 }, height: { ideal: 720 } }
      
    const constraints = {
      video:  resolution ,
      audio: true,
    };
    const configuration = {
      iceServers,
      iceTransportPolicy: "all",
    };
    viewer.peerConnection = new RTCPeerConnection(configuration);
    // Poll for connection stats
    viewer.peerConnectionStatsInterval = setInterval(
      () => viewer.peerConnection.getStats().then(()=>{}),
      1000
    );

    viewer.signalingClient.on("open", async () => {
      console.log("[VIEWER] Connected to signaling service");

      // Create an SDP offer to send to the master
      console.log("[VIEWER] Creating SDP offer");
      await viewer.peerConnection.setLocalDescription(
        await viewer.peerConnection.createOffer({
          offerToReceiveAudio: true,
          offerToReceiveVideo: true,
        })
      );

        console.log("[VIEWER] Sending SDP offer");
        viewer.signalingClient.sendSdpOffer(
          viewer.peerConnection.localDescription
        );
      
      console.log("[VIEWER] Generating ICE candidates");
    });

    viewer.signalingClient.on("sdpAnswer", async (answer) => {
      // Add the SDP answer to the peer connection
      console.log("[VIEWER] Received SDP answer");
      await viewer.peerConnection.setRemoteDescription(answer);
    });

    viewer.signalingClient.on("iceCandidate", (candidate) => {
      // Add the ICE candidate received from the MASTER to the peer connection
      console.log("[VIEWER] Received ICE candidate");
      viewer.peerConnection.addIceCandidate(candidate);
    });

    viewer.signalingClient.on("close", () => {
      console.log("[VIEWER] Disconnected from signaling channel");
    });

    viewer.signalingClient.on("error", (error) => {
      console.error("[VIEWER] Signaling client error: ", error);
    });

    // Send any ICE candidates to the other peer
    viewer.peerConnection.addEventListener("icecandidate", ({ candidate }) => {
      if (candidate) {
        console.log("[VIEWER] Generated ICE candidate");

        // When trickle ICE is enabled, send the ICE candidates as they are generated.
       
          console.log("[VIEWER] Sending ICE candidate");
          viewer.signalingClient.sendIceCandidate(candidate);
       
      } 
    });

    // As remote tracks are received, add them to the remote view
    viewer.peerConnection.addEventListener("track", (event) => {
      console.log("[VIEWER] Received remote track");
      if (viewer.remoteView.srcObject) {
        return;
      }
      viewer.remoteStream = event.streams[0];
      viewer.remoteView.srcObject = viewer.remoteStream;
    });

    console.log("[VIEWER] Starting viewer connection");
    viewer.signalingClient.open();
  }

  useEffect(() => {
    startViewer();
  }, []);

  return (
    <>
      <video ref={videoRef} autoPlay playsInline />
    </>
  );
}
