import React, { useState, useEffect } from "react";
import AWS from "aws-sdk";
import * as KVSWebRTC from "amazon-kinesis-video-streams-webrtc";

function StartMaster(props) {
  const [signalingClient, setSignalingClient] = useState(null);
  const [localStream, setLocalStream] = useState(props.localStream);
  const [peerConnectionByClientId, setPeerConnectionByClientId] = useState({});
  const [peerConnectionStatsInterval, setPeerConnectionStatsInterval] =useState(null);
  const [channelName] = useState(props.masterChannel);

  const credentials = {
    region: "us-east-2",
    accessKeyId: "AKIATZ6B4KZG2PWXFQTF",
    secretAccessKey: "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",
    sessionToken: "",
    endpoint: "https://kinesisvideo.us-east-2.amazonaws.com",
    sendVideo: true,
    clientId: "LSKDFJSSLD",
  };

  const start = async () => {
    const kinesisVideoClient = new AWS.KinesisVideo({
      region: credentials.region,
      accessKeyId: credentials.accessKeyId,
      secretAccessKey: credentials.secretAccessKey,
      sessionToken: credentials.sessionToken,
      endpoint: credentials.endpoint,
      correctClockSkew: true,
    });

    const describeSignalingChannelResponseMaster = await kinesisVideoClient
      .describeSignalingChannel({
        ChannelName: channelName,
      })
      .promise();
    const channelARNMaster =
      describeSignalingChannelResponseMaster.ChannelInfo.ChannelARN;
    const getSignalingChannelEndpointResponseMaster = await kinesisVideoClient
      .getSignalingChannelEndpoint({
        ChannelARN: channelARNMaster,
        SingleMasterChannelEndpointConfiguration: {
          Protocols: ["WSS", "HTTPS"],
          Role: KVSWebRTC.Role.MASTER,
        },
      })
      .promise();

    const endpointsByProtocolMaster =
      getSignalingChannelEndpointResponseMaster.ResourceEndpointList.reduce(
        (endpoints, endpoint) => {
          endpoints[endpoint.Protocol] = endpoint.ResourceEndpoint;
          return endpoints;
        },
        {}
      );
    console.log("[MASTER] Endpoints: ", endpointsByProtocolMaster);

    const kinesisVideoSignalingChannelsClientMaster =
      new AWS.KinesisVideoSignalingChannels({
        region: credentials.region,
        accessKeyId: credentials.accessKeyId,
        secretAccessKey: credentials.secretAccessKey,
        sessionToken: credentials.sessionToken,
        endpoint: endpointsByProtocolMaster.HTTPS,
        correctClockSkew: true,
      });

    const getIceServerConfigResponseMaster =
      await kinesisVideoSignalingChannelsClientMaster
        .getIceServerConfig({
          ChannelARN: channelARNMaster,
        })
        .promise();

    const iceServersMaster = [];
    iceServersMaster.push({
      urls: `stun:stun.kinesisvideo.${credentials.region}.amazonaws.com:443`,
    });

    getIceServerConfigResponseMaster.IceServerList.forEach((iceServer) =>
      iceServersMaster.push({
        urls: iceServer.Uris,
        username: iceServer.Username,
        credential: iceServer.Password,
      })
    );
    console.log("[MASTER] ICE servers: ", iceServersMaster);

    setSignalingClient(
      new KVSWebRTC.SignalingClient({
        channelARN: channelARNMaster,
        channelEndpoint: endpointsByProtocolMaster.WSS,
        role: KVSWebRTC.Role.MASTER,
        region: credentials.region,
        credentials: {
          accessKeyId: credentials.accessKeyId,
          secretAccessKey: credentials.secretAccessKey,
          sessionToken: credentials.sessionToken,
        },
        systemClockOffset: kinesisVideoClient.config.systemClockOffset,
      })
    );

    const configurationMaster = {
      iceServersMaster,
      iceTransportPolicy: "all",
    };

    const resolution = { width: { ideal: 1280 }, height: { ideal: 720 } };

    try {
      if (props.type == "camera" && localStream == null) {
        setLocalStream(
          await navigator.mediaDevices.getUserMedia({
            video: resolution,
            audio: true,
          })
        );
      } else if (props.type == "screen" && localStream == null) {
        setLocalStream(await navigator.mediaDevices.getDisplayMedia());
      }
    } catch (e) {
      console.error("[MASTER] Could not find webcam");
    }

    signalingClient.on("open", async (offer, remoteClientId) => {
      console.log("[MASTER] Connected to signaling service");
    });

    signalingClient.on("sdpOffer", async (offer, remoteClientId) => {
      console.log("[MASTER] Received SDP offer from client: " + remoteClientId);
      const peerConnectionMaster = new RTCPeerConnection(configurationMaster);
      setPeerConnectionByClientId({ remoteClientId: peerConnectionMaster });

      if (!peerConnectionStatsInterval) {
        setPeerConnectionStatsInterval(
          setInterval(
            () => peerConnectionMaster.getStats().then(() => {}),
            1000
          )
        );
      }

      peerConnectionMaster.addEventListener("icecandidate", ({ candidate }) => {
        if (candidate) {
          console.log(
            "[MASTER] Generated ICE candidate for client: " + remoteClientId
          );
          signalingClient.sendIceCandidate(candidate, remoteClientId);
          console.log(
            "[MASTER] Sending ICE candidate to client: " + remoteClientId
          );
        }
      });

      if (localStream) {
        localStream
          .getTracks()
          .forEach((track) =>
            peerConnectionMaster.addTrack(track, localStream)
          );
      }

      await peerConnectionMaster.setRemoteDescription(offer);
      console.log("[MASTER] Creating SDP answer for client: " + remoteClientId);
      await peerConnectionMaster.setLocalDescription(
        await peerConnectionMaster.createAnswer({
          offerToReceiveAudio: true,
          offerToReceiveVideo: true,
        })
      );
      console.log("[MASTER] Sending SDP answer to client: " + remoteClientId);
      signalingClient.sendSdpAnswer(
        peerConnectionMaster.localDescription,
        remoteClientId
      );
      console.log(
        "[MASTER] Generating ICE candidates for client: " + remoteClientId
      );
    });

    signalingClient.on("iceCandidate", async (candidate, remoteClientId) => {
      console.log(
        "[MASTER] Received ICE candidate from client: " + remoteClientId
      );
      const peerConnection = peerConnectionByClientId[remoteClientId];
      peerConnection.addIceCandidate(candidate);
    });

    signalingClient.on("close", () => {
      console.log("[MASTER] Disconnected from signaling channel");
    });

    signalingClient.on("error", () => {
      console.error("[MASTER] Signaling client error");
    });

    console.log("[MASTER] Starting master connection");
    signalingClient.open();
  };

  useEffect(() => {
    start();
  }, []);

  return true;
}

export default StartMaster;