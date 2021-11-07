import { useRef, useEffect, forwardRef } from "react";
import AWS from "aws-sdk";
import * as KVSWebRTC from "amazon-kinesis-video-streams-webrtc"

export default forwardRef(function MatchViewHandle(props) {
    const videoRef = useRef(null);

    const sample = {
        peerConnectionByClientId: {},
        dataChannelByClientId: {},
        localStream: null,
        remoteStreams: [],
        peerConnectionStatsInterval: null,
    }

    const master = {
        signalingClient: null,
        localStream: props.localStream,
        peerConnectionByClientId: {},
        peerConnectionStatsInterval: null,
        localStream: null,
        channelName: props.masterChannel
    }

    const viewer = {
        signalingClient: null,
        remoteStreams: [],
        remoteView:null,
        channelName: props.viewerChannel,
        peerConnectionStatsInterval: null,
    }

    const credentials = {
        region: "us-east-2",
        accessKeyId: "AKIATZ6B4KZG2K37YTAD",
        secretAccessKey: "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",
        sessionToken: "",
        endpoint: "https://kinesisvideo.us-east-2.amazonaws.com",
        sendVideo: true,
        clientId: "LSKDFJSSLD"
    }

    async function startSample() {
        console.log("SAMPLE STARTED")
        console.log(props,master)
        viewer.remoteView = videoRef.current;
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
            ChannelName: master.channelName,
        })
        .promise();

        const describeSignalingChannelResponseViewer = await kinesisVideoClient
        .describeSignalingChannel({
            ChannelName: viewer.channelName,
        })
        .promise();
        
        const channelARNMaster = describeSignalingChannelResponseMaster.ChannelInfo.ChannelARN;
        const channelARNViewer = describeSignalingChannelResponseViewer.ChannelInfo.ChannelARN;
        console.log("[SAMPLE] Channel ARN: ", channelARNMaster + " " + channelARNViewer);

        const getSignalingChannelEndpointResponseMaster = await kinesisVideoClient
        .getSignalingChannelEndpoint({
            ChannelARN: channelARNMaster,
            SingleMasterChannelEndpointConfiguration: {
                Protocols: ["WSS", "HTTPS"],
                // Role: KVSWebRTC.Role.MASTER,
                Role: "MASTER",
            },
        })
        .promise();

        const getSignalingChannelEndpointResponseViewer = await kinesisVideoClient
        .getSignalingChannelEndpoint({
            ChannelARN: channelARNViewer,
            SingleMasterChannelEndpointConfiguration: {
                Protocols: ["WSS", "HTTPS"],
                // Role: KVSWebRTC.Role.VIEWER,
                Role: "VIEWER",
            },
        })
        .promise();
        
        const endpointsByProtocolMaster = 
        getSignalingChannelEndpointResponseMaster.ResourceEndpointList.reduce(
            (endpoints, endpoint) => {
                endpoints[endpoint.Protocol] = endpoint.ResourceEndpoint;
                return endpoints;
            },{}
        )
        console.log("[MASTER] Endpoints: ", endpointsByProtocolMaster);

        const endpointsByProtocolViewer = 
        getSignalingChannelEndpointResponseViewer.ResourceEndpointList.reduce(
            (endpoints,endpoint) => {
                endpoints[endpoint.Protocol] = endpoint.ResourceEndpoint;
                return endpoints;
            }, {}
        )
        console.log("[VIEWER] Endpoints: ", endpointsByProtocolViewer);

        const kinesisVideoSignalingChannelsClientMaster = 
        new AWS.KinesisVideoSignalingChannels({
            region:credentials.region,
            accessKeyId:credentials.accessKeyId,
            secretAccessKey:credentials.secretAccessKey,
            sessionToken: credentials.sessionToken,
            endpoint: endpointsByProtocolMaster.HTTPS,
            correctClockSkew: true,
        })
            
        const kinesisVideoSignalingChannelsClientViewer = 
        new AWS.KinesisVideoSignalingChannels({
            region:credentials.region,
            accessKeyId:credentials.accessKeyId,
            secretAccessKey:credentials.secretAccessKey,
            sessionToken: credentials.sessionToken,
            endpoint: endpointsByProtocolViewer.HTTPS,
            correctClockSkew: true,
        })

        const getIceServerConfigResponseMaster = await kinesisVideoSignalingChannelsClientMaster
        .getIceServerConfig({
            ChannelARN: channelARNMaster,
        })
        .promise();

        const getIceServerConfigResponseViewer = await kinesisVideoSignalingChannelsClientViewer
        .getIceServerConfig({
            ChannelARN: channelARNViewer,
        })
        .promise();

        const iceServersMaster = [];
        const iceServersViewer = [];

        iceServersMaster.push({
            urls: `stun:stun.kinesisvideo.${credentials.region}.amazonaws.com:443`,
        })
        iceServersViewer.push({
            urls: `stun:stun.kinesisvideo.${credentials.region}.amazonaws.com:443`,
        })

        getIceServerConfigResponseMaster.IceServerList.forEach((iceServer)=>
            iceServersMaster.push({
                urls: iceServer.Uris,
                username: iceServer.Username,
                credential: iceServer.Password,
            })
        )
        console.log("[MASTER] ICE servers: ", iceServersMaster);

        getIceServerConfigResponseViewer.IceServerList.forEach((iceServer)=>
            iceServersViewer.push({
                urls: iceServer.Uris,
                username: iceServer.Username,
                credential: iceServer.Password,
            })
        )
        console.log("[VIEWER] ICE servers: ", iceServersViewer);

        master.signalingClient = new KVSWebRTC.SignalingClient({
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
        });

        viewer.signalingClient = new KVSWebRTC.SignalingClient({
            channelARN: channelARNViewer,
            channelEndpoint: endpointsByProtocolViewer.WSS,
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

        const configurationMaster = {
            iceServersMaster,
            iceTransportPolicy: "all",
        }
      
        const configurationViewer = {
            iceServersViewer,
            iceTransportPolicy: "all",
        }

        const resolution = { width: { ideal: 1280 }, height: { ideal: 720 } }

        master.localStream = props.localStream;

        master.signalingClient.on("open",async (offer,remoteClientId)=>{
            console.log("[MASTER] Connected to signaling service")
        })

        master.signalingClient.on("sdpOffer",async(offer,remoteClientId)=>{
            console.log("[MASTER] Received SDP offer from client: " + remoteClientId)
            const peerConnectionMaster = new RTCPeerConnection(configurationMaster);
            master.peerConnectionByClientId[remoteClientId] = peerConnectionMaster;

            if(!master.peerConnectionStatsInterval) {
                master.peerConnectionStatsInterval = setInterval(
                    ()=> peerConnectionMaster.getStats().then(()=>{}),1000
                )
            }

            peerConnectionMaster.addEventListener("icecandidate",({candidate}) => {
                if(candidate) {
                    console.log("[MASTER] Generated ICE candidate for client: " + remoteClientId)
                    master.signalingClient.sendIceCandidate(candidate,remoteClientId);
                    console.log("[MASTER] Sending ICE candidate to client: " + remoteClientId)
                } 
            })

            if(master.localStream) {
                master.localStream
                .getTracks()
                .forEach(track=>peerConnectionMaster.addTrack(track,master.localStream))
            }

            await peerConnectionMaster.setRemoteDescription(offer)
            console.log("[MASTER] Creating SDP answer for client: " + remoteClientId);
            await peerConnectionMaster.setLocalDescription(
                await peerConnectionMaster.createAnswer({
                    offerToReceiveAudio: true,
                    offerToReceiveVideo: true,
                })
            )
            console.log("[MASTER] Sending SDP answer to client: " + remoteClientId);
            master.signalingClient.sendSdpAnswer(
                peerConnectionMaster.localDescription,
                remoteClientId
            );
            console.log("[MASTER] Generating ICE candidates for client: " + remoteClientId)
        })

        master.signalingClient.on("iceCandidate",async(candidate,remoteClientId)=>{
            console.log("[MASTER] Received ICE candidate from client: " + remoteClientId)
            const peerConnection = master.peerConnectionByClientId[remoteClientId];
            peerConnection.addIceCandidate(candidate);
        })

        master.signalingClient.on("close", () => {
            console.log("[MASTER] Disconnected from signaling channel");
        });
      
        master.signalingClient.on("error", () => {
            console.error("[MASTER] Signaling client error");
        });
      
        console.log("[MASTER] Starting master connection");
        master.signalingClient.open();

        viewer.peerConnection = new RTCPeerConnection(configurationViewer);
        viewer.peerConnectionStatsInterval = setInterval(
            () => viewer.peerConnection.getStats().then(()=>{}),1000
        );

        viewer.signalingClient.on("open", async () => {
            console.log("[VIEWER] Connected to signaling service");
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
        })

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

        viewer.peerConnection.addEventListener("icecandidate", ({ candidate }) => {
            if (candidate) {
                console.log("[VIEWER] Generated ICE candidate");
                console.log("[VIEWER] Sending ICE candidate");
                viewer.signalingClient.sendIceCandidate(candidate);
            }
        });
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

    const endSample = () => {
        console.log('[MASTER] Stopping master connection');
        if(master.signalingClient) {
            master.signalingClient.close();
            master.signalingClient = null;
        }
        Object.keys(master.peerConnectionByClientId).forEach(clientId => {
            master.peerConnectionByClientId[clientId].close();
        });
        master.peerConnectionByClientId = [];
        if (master.localStream) {
            master.localStream.getTracks().forEach(track => track.stop());
            master.localStream = null;
        }
        if (master.peerConnectionStatsInterval) {
            clearInterval(master.peerConnectionStatsInterval);
            master.peerConnectionStatsInterval = null;
        }
        if (sample.dataChannelByClientId) {
            sample.dataChannelByClientId = {};
        }
        console.log('[VIEWER] Stopping viewer connection');
        if (viewer.signalingClient) {
            viewer.signalingClient.close();
            viewer.signalingClient = null;
        }
        if (viewer.peerConnection) {
            viewer.peerConnection.close();
            viewer.peerConnection = null;
        }
        if (viewer.remoteStream) {
            viewer.remoteStream.getTracks().forEach(track => track.stop());
            viewer.remoteStream = null;
        }
        if (viewer.peerConnectionStatsInterval) {
            clearInterval(viewer.peerConnectionStatsInterval);
            viewer.peerConnectionStatsInterval = null;
        }
        if (viewer.remoteView) {
            viewer.remoteView.srcObject = null;
        }
        if (viewer.dataChannel) {
            viewer.dataChannel = null;
        }
    }

    useEffect(()=>{
        console.log("Start sample")
        console.log(props)
        startSample();
    },[])

    return (
        <>
            <video ref={videoRef} autoPlay playsInline/>
        </>
    )
})