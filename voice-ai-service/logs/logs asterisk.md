[root@srv1137148 voice-ai-service]# podman exec -it oml-asterisk-server asterisk -rvvvvv
Asterisk 20.14.0, Copyright (C) 1999 - 2025, Sangoma Technologies Corporation and others.
Created by Mark Spencer <markster@digium.com>
Asterisk comes with ABSOLUTELY NO WARRANTY; type 'core show warranty' for details.
This is free software, with components licensed under the GNU General Public
License version 2 and other licenses; you are welcome to redistribute it under
certain conditions. Type 'core show license' for details.
=========================================================================
Connected to Asterisk 20.14.0 currently running on srv1137148 (pid = 1)
<--- Received SIP request (477 bytes) from UDP:46.19.209.44:5060 --->
OPTIONS sip:s@31.97.210.100:5060 SIP/2.0
Via: SIP/2.0/UDP 46.19.209.44;branch=z9hG4bK3d71.2712ece2b956286a274f1bae6d6fa82a.0
Via: SIP/2.0/UDP 46.19.209.17;received=46.19.209.17;branch=z9hG4bKOVdI8aMK;rport=5060
From: sip:s@31.97.210.100:5060;tag=sip_registrar
To: sip:s@31.97.210.100:5060
CSeq: 10 OPTIONS
Call-ID: 10-06ACA21A-693A5E93000406A1-4A9FF6C0
Max-Forwards: 69
User-Agent: DIDWW Y SBC node
Contact: <sip:46.19.209.17:5060;transport=udp>
Content-Length: 0


<--- Transmitting SIP response (951 bytes) to UDP:46.19.209.44:5060 --->
SIP/2.0 404 Not Found
Via: SIP/2.0/UDP 46.19.209.44;rport=5060;received=46.19.209.44;branch=z9hG4bK3d71.2712ece2b956286a274f1bae6d6fa82a.0
Via: SIP/2.0/UDP 46.19.209.17;rport=5060;received=46.19.209.17;branch=z9hG4bKOVdI8aMK
Call-ID: 10-06ACA21A-693A5E93000406A1-4A9FF6C0
From: <sip:s@31.97.210.100>;tag=sip_registrar
To: <sip:s@31.97.210.100>;tag=z9hG4bK3d71.2712ece2b956286a274f1bae6d6fa82a.0
CSeq: 10 OPTIONS
Accept: application/xpidf+xml, application/cpim-pidf+xml, application/dialog-info+xml, application/simple-message-summary, application/pidf+xml, application/pidf+xml, application/dialog-info+xml, application/simple-message-summary, application/sdp, message/sipfrag;version=2.0
Allow: OPTIONS, REGISTER, SUBSCRIBE, NOTIFY, PUBLISH, INVITE, ACK, BYE, CANCEL, UPDATE, PRACK, INFO, MESSAGE, REFER
Supported: 100rel, timer, replaces, norefersub
Accept-Encoding: identity
Accept-Language: en
Server: omnileads
Content-Length:  0


<--- Received SIP request (477 bytes) from UDP:46.19.212.54:5060 --->
OPTIONS sip:s@31.97.210.100:5060 SIP/2.0
Via: SIP/2.0/UDP 46.19.212.54;branch=z9hG4bK3c78.a32e6dfc63086d0f9b7dfda505489863.0
Via: SIP/2.0/UDP 46.19.212.55;received=46.19.212.55;branch=z9hG4bKodyJqaY0;rport=5060
From: sip:s@31.97.210.100:5060;tag=sip_registrar
To: sip:s@31.97.210.100:5060
CSeq: 10 OPTIONS
Call-ID: 15-0F9E4354-693A5E940005C3F6-312FB6C0
Max-Forwards: 69
User-Agent: DIDWW Y SBC node
Contact: <sip:46.19.212.55:5060;transport=udp>
Content-Length: 0


<--- Transmitting SIP response (951 bytes) to UDP:46.19.212.54:5060 --->
SIP/2.0 404 Not Found
Via: SIP/2.0/UDP 46.19.212.54;rport=5060;received=46.19.212.54;branch=z9hG4bK3c78.a32e6dfc63086d0f9b7dfda505489863.0
Via: SIP/2.0/UDP 46.19.212.55;rport=5060;received=46.19.212.55;branch=z9hG4bKodyJqaY0
Call-ID: 15-0F9E4354-693A5E940005C3F6-312FB6C0
From: <sip:s@31.97.210.100>;tag=sip_registrar
To: <sip:s@31.97.210.100>;tag=z9hG4bK3c78.a32e6dfc63086d0f9b7dfda505489863.0
CSeq: 10 OPTIONS
Accept: application/xpidf+xml, application/cpim-pidf+xml, application/dialog-info+xml, application/simple-message-summary, application/pidf+xml, application/pidf+xml, application/dialog-info+xml, application/simple-message-summary, application/sdp, message/sipfrag;version=2.0
Allow: OPTIONS, REGISTER, SUBSCRIBE, NOTIFY, PUBLISH, INVITE, ACK, BYE, CANCEL, UPDATE, PRACK, INFO, MESSAGE, REFER
Supported: 100rel, timer, replaces, norefersub
Accept-Encoding: identity
Accept-Language: en
Server: omnileads
Content-Length:  0


  == Manager 'omnileads' logged on from 31.97.210.100
[Dec 11 00:03:02] SECURITY[73]: res_security_log.c:114 security_event_stasis_cb: SecurityEvent="SuccessfulAuth",EventTV="2025-12-11T00:03:02.033-0600",Severity="Informational",Service="AMI",EventVersion="1",AccountID="omnileads",SessionID="0x7f54680047a0",LocalAddress="IPV4/TCP/31.97.210.100/5038",RemoteAddress="IPV4/TCP/31.97.210.100/48276",UsingPassword="0",SessionTV="2025-12-11T00:03:02.033-0600"
  == Manager 'omnileads' logged off from 31.97.210.100
    -- Called 50686951614@classifier-originate
    -- Executing [50686951614@classifier-originate:1] NoOp("Local/50686951614@classifier-originate-00000035;2", "🔍 Classifier Originate → 50686951614") in new stack
    -- Executing [50686951614@classifier-originate:2] Set("Local/50686951614@classifier-originate-00000035;2", "CALLERID(num)=18887719500") in new stack
    -- Executing [50686951614@classifier-originate:3] Set("Local/50686951614@classifier-originate-00000035;2", "CALLERID(name)=Service Check") in new stack
    -- Executing [50686951614@classifier-originate:4] Set("Local/50686951614@classifier-originate-00000035;2", "NUM=+50686951614") in new stack
    -- Executing [50686951614@classifier-originate:5] Goto("Local/50686951614@classifier-originate-00000035;2", "classifier-out,+50686951614,1") in new stack
    -- Goto (classifier-out,+50686951614,1)
    -- Executing [+50686951614@classifier-out:1] NoOp("Local/50686951614@classifier-originate-00000035;2", "📡 CLASSIFIER ROUTING → +50686951614") in new stack
    -- Executing [+50686951614@classifier-out:2] Set("Local/50686951614@classifier-originate-00000035;2", "__DIAL_START=1765432982") in new stack
    -- Executing [+50686951614@classifier-out:3] GotoIf("Local/50686951614@classifier-originate-00000035;2", "0?use_local:use_tollfree") in new stack
    -- Goto (classifier-out,+50686951614,7)
    -- Executing [+50686951614@classifier-out:7] NoOp("Local/50686951614@classifier-originate-00000035;2", "🌍 ROW detected -> Using Telnyx TollFree") in new stack
    -- Executing [+50686951614@classifier-out:8] Dial("Local/50686951614@classifier-originate-00000035;2", "PJSIP/+50686951614@telnyx_tollfre_out,20,gU(classifier-answer-handler^+50686951614)") in new stack
    -- Called PJSIP/+50686951614@telnyx_tollfre_out
<--- Transmitting SIP request (964 bytes) to UDP:192.76.120.10:5060 --->
INVITE sip:+50686951614@sip.telnyx.com:5060 SIP/2.0
Via: SIP/2.0/UDP 31.97.210.100:5060;rport;branch=z9hG4bKPjb007b6d5-4efe-4d4c-9310-31640a4a899c
From: "Service Check" <sip:18887719500@31.97.210.100>;tag=5dc379ae-53fe-45f6-8999-fa834f6109b5
To: <sip:+50686951614@sip.telnyx.com>
Contact: <sip:omnileads@31.97.210.100:5060>
Call-ID: ea257417-2236-4333-9b5f-dab9cde2b927
CSeq: 25181 INVITE
Allow: OPTIONS, REGISTER, SUBSCRIBE, NOTIFY, PUBLISH, INVITE, ACK, BYE, CANCEL, UPDATE, PRACK, INFO, MESSAGE, REFER
Supported: 100rel, timer, replaces, norefersub, histinfo
Session-Expires: 1800
Min-SE: 90
Max-Forwards: 20
User-Agent: omnileads
Content-Type: application/sdp
Content-Length:   261

v=0
o=- 377193682 377193682 IN IP4 31.97.210.100
s=Asterisk
c=IN IP4 31.97.210.100
t=0 0
m=audio 42554 RTP/AVP 0 8 101
a=rtpmap:0 PCMU/8000
a=rtpmap:8 PCMA/8000
a=rtpmap:101 telephone-event/8000
a=fmtp:101 0-16
a=ptime:20
a=maxptime:140
a=sendrecv

<--- Received SIP response (400 bytes) from UDP:192.76.120.10:5060 --->
SIP/2.0 100 Telnyx Trying
Via: SIP/2.0/UDP 31.97.210.100:5060;rport=5060;received=31.97.210.100;branch=z9hG4bKPjb007b6d5-4efe-4d4c-9310-31640a4a899c
From: "Service Check" <sip:18887719500@31.97.210.100>;tag=5dc379ae-53fe-45f6-8999-fa834f6109b5
To: <sip:+50686951614@sip.telnyx.com>
Call-ID: ea257417-2236-4333-9b5f-dab9cde2b927
CSeq: 25181 INVITE
Server: Telnyx SIP Proxy
Content-Length: 0


<--- Received SIP response (759 bytes) from UDP:192.76.120.10:5060 --->
SIP/2.0 407 Proxy Authentication Required
Via: SIP/2.0/UDP 31.97.210.100:5060;received=31.97.210.100;rport=5060;branch=z9hG4bKPjb007b6d5-4efe-4d4c-9310-31640a4a899c
From: "Service Check" <sip:18887719500@31.97.210.100>;tag=5dc379ae-53fe-45f6-8999-fa834f6109b5
To: <sip:+50686951614@sip.telnyx.com>;tag=H6B244UZ3cc0a
Call-ID: ea257417-2236-4333-9b5f-dab9cde2b927
CSeq: 25181 INVITE
Accept: application/sdp
Allow: INVITE, ACK, BYE, CANCEL, OPTIONS, MESSAGE, INFO, UPDATE, REFER, NOTIFY
Supported: path
Allow-Events: talk, hold, conference, refer
Proxy-Authenticate: Digest realm="sip.telnyx.com", nonce="e775828b-55dc-40fa-96ef-692567b7995d", algorithm=MD5, qop="auth", opaque="75e5a430-bd3d-46ff-8f32-00eefa9c7b50/10.239.42.24"
Content-Length: 0


<--- Transmitting SIP request (426 bytes) to UDP:192.76.120.10:5060 --->
ACK sip:+50686951614@sip.telnyx.com:5060 SIP/2.0
Via: SIP/2.0/UDP 31.97.210.100:5060;rport;branch=z9hG4bKPjb007b6d5-4efe-4d4c-9310-31640a4a899c
From: "Service Check" <sip:18887719500@31.97.210.100>;tag=5dc379ae-53fe-45f6-8999-fa834f6109b5
To: <sip:+50686951614@sip.telnyx.com>;tag=H6B244UZ3cc0a
Call-ID: ea257417-2236-4333-9b5f-dab9cde2b927
CSeq: 25181 ACK
Max-Forwards: 20
User-Agent: omnileads
Content-Length:  0


<--- Transmitting SIP request (1325 bytes) to UDP:192.76.120.10:5060 --->
INVITE sip:+50686951614@sip.telnyx.com:5060 SIP/2.0
Via: SIP/2.0/UDP 31.97.210.100:5060;rport;branch=z9hG4bKPj359c60a8-6f99-4ce1-9c0f-34707af05090
From: "Service Check" <sip:18887719500@31.97.210.100>;tag=5dc379ae-53fe-45f6-8999-fa834f6109b5
To: <sip:+50686951614@sip.telnyx.com>
Contact: <sip:omnileads@31.97.210.100:5060>
Call-ID: ea257417-2236-4333-9b5f-dab9cde2b927
CSeq: 25182 INVITE
Allow: OPTIONS, REGISTER, SUBSCRIBE, NOTIFY, PUBLISH, INVITE, ACK, BYE, CANCEL, UPDATE, PRACK, INFO, MESSAGE, REFER
Supported: 100rel, timer, replaces, norefersub, histinfo
Session-Expires: 1800
Min-SE: 90
Max-Forwards: 20
User-Agent: omnileads
Proxy-Authorization: Digest username="userbryamlopez412598", realm="sip.telnyx.com", nonce="e775828b-55dc-40fa-96ef-692567b7995d", uri="sip:+50686951614@sip.telnyx.com:5060", response="f3f9dc9f4d783d6586dd7f22cac47a17", algorithm=MD5, cnonce="8240dafce5334993976bd9ac57f0b4f3", opaque="75e5a430-bd3d-46ff-8f32-00eefa9c7b50/10.239.42.24", qop=auth, nc=00000001
Content-Type: application/sdp
Content-Length:   261

v=0
o=- 377193682 377193682 IN IP4 31.97.210.100
s=Asterisk
c=IN IP4 31.97.210.100
t=0 0
m=audio 42554 RTP/AVP 0 8 101
a=rtpmap:0 PCMU/8000
a=rtpmap:8 PCMA/8000
a=rtpmap:101 telephone-event/8000
a=fmtp:101 0-16
a=ptime:20
a=maxptime:140
a=sendrecv

<--- Received SIP response (400 bytes) from UDP:192.76.120.10:5060 --->
SIP/2.0 100 Telnyx Trying
Via: SIP/2.0/UDP 31.97.210.100:5060;rport=5060;received=31.97.210.100;branch=z9hG4bKPj359c60a8-6f99-4ce1-9c0f-34707af05090
From: "Service Check" <sip:18887719500@31.97.210.100>;tag=5dc379ae-53fe-45f6-8999-fa834f6109b5
To: <sip:+50686951614@sip.telnyx.com>
Call-ID: ea257417-2236-4333-9b5f-dab9cde2b927
CSeq: 25182 INVITE
Server: Telnyx SIP Proxy
Content-Length: 0


<--- Received SIP response (642 bytes) from UDP:192.76.120.10:5060 --->
SIP/2.0 403 Unverified origination number D51
Via: SIP/2.0/UDP 31.97.210.100:5060;received=31.97.210.100;rport=5060;branch=z9hG4bKPj359c60a8-6f99-4ce1-9c0f-34707af05090
Max-Forwards: 19
From: "Service Check" <sip:18887719500@31.97.210.100>;tag=5dc379ae-53fe-45f6-8999-fa834f6109b5
To: <sip:+50686951614@sip.telnyx.com>;tag=jF5t6Zc30N2jp
Call-ID: ea257417-2236-4333-9b5f-dab9cde2b927
CSeq: 25182 INVITE
Accept: application/sdp
Allow: INVITE, ACK, BYE, CANCEL, OPTIONS, MESSAGE, INFO, UPDATE, REFER, NOTIFY
Supported: path
Allow-Events: talk, hold, conference, refer
Reason: Q.850;cause=21;text="CALL_REJECTED"
Content-Length: 0


<--- Transmitting SIP request (426 bytes) to UDP:192.76.120.10:5060 --->
ACK sip:+50686951614@sip.telnyx.com:5060 SIP/2.0
Via: SIP/2.0/UDP 31.97.210.100:5060;rport;branch=z9hG4bKPj359c60a8-6f99-4ce1-9c0f-34707af05090
From: "Service Check" <sip:18887719500@31.97.210.100>;tag=5dc379ae-53fe-45f6-8999-fa834f6109b5
To: <sip:+50686951614@sip.telnyx.com>;tag=jF5t6Zc30N2jp
Call-ID: ea257417-2236-4333-9b5f-dab9cde2b927
CSeq: 25182 ACK
Max-Forwards: 20
User-Agent: omnileads
Content-Length:  0


  == Everyone is busy/congested at this time (1:0/0/1)
    -- Executing [+50686951614@classifier-out:9] Goto("Local/50686951614@classifier-originate-00000035;2", "analyze") in new stack
    -- Goto (classifier-out,+50686951614,10)
    -- Executing [+50686951614@classifier-out:10] NoOp("Local/50686951614@classifier-originate-00000035;2", "📋 CLASSIFIER RESULT: Status=CHANUNAVAIL Cause=21") in new stack
    -- Executing [+50686951614@classifier-out:11] GotoIf("Local/50686951614@classifier-originate-00000035;2", "0?active") in new stack
    -- Executing [+50686951614@classifier-out:12] GotoIf("Local/50686951614@classifier-originate-00000035;2", "0?active") in new stack
    -- Executing [+50686951614@classifier-out:13] GotoIf("Local/50686951614@classifier-originate-00000035;2", "0?active") in new stack
    -- Executing [+50686951614@classifier-out:14] GotoIf("Local/50686951614@classifier-originate-00000035;2", "0?active") in new stack
    -- Executing [+50686951614@classifier-out:15] GotoIf("Local/50686951614@classifier-originate-00000035;2", "0?active") in new stack
    -- Executing [+50686951614@classifier-out:16] GotoIf("Local/50686951614@classifier-originate-00000035;2", "0?active") in new stack
    -- Executing [+50686951614@classifier-out:17] GotoIf("Local/50686951614@classifier-originate-00000035;2", "0?active") in new stack
    -- Executing [+50686951614@classifier-out:18] GotoIf("Local/50686951614@classifier-originate-00000035;2", "0?inactive") in new stack
    -- Executing [+50686951614@classifier-out:19] GotoIf("Local/50686951614@classifier-originate-00000035;2", "0?inactive") in new stack
    -- Executing [+50686951614@classifier-out:20] GotoIf("Local/50686951614@classifier-originate-00000035;2", "0?inactive") in new stack
    -- Executing [+50686951614@classifier-out:21] GotoIf("Local/50686951614@classifier-originate-00000035;2", "0?inactive") in new stack
    -- Executing [+50686951614@classifier-out:22] GotoIf("Local/50686951614@classifier-originate-00000035;2", "0?inactive") in new stack
    -- Executing [+50686951614@classifier-out:23] Goto("Local/50686951614@classifier-originate-00000035;2", "indeterminate") in new stack
    -- Goto (classifier-out,+50686951614,30)
    -- Executing [+50686951614@classifier-out:30] NoOp("Local/50686951614@classifier-originate-00000035;2", "⚠️ NUMBER STATUS INDETERMINATE") in new stack
    -- Executing [+50686951614@classifier-out:31] Set("Local/50686951614@classifier-originate-00000035;2", "CURL_RESULT=ERROR") in new stack
    -- Executing [+50686951614@classifier-out:32] Hangup("Local/50686951614@classifier-originate-00000035;2", "") in new stack
  == Spawn extension (classifier-out, +50686951614, 32) exited non-zero on 'Local/50686951614@classifier-originate-00000035;2'
  == Manager 'omnileads' logged on from 31.97.210.100
[Dec 11 00:03:04] SECURITY[73]: res_security_log.c:114 security_event_stasis_cb: SecurityEvent="SuccessfulAuth",EventTV="2025-12-11T00:03:04.189-0600",Severity="Informational",Service="AMI",EventVersion="1",AccountID="omnileads",SessionID="0x7f53c41194c0",LocalAddress="IPV4/TCP/31.97.210.100/5038",RemoteAddress="IPV4/TCP/31.97.210.100/48292",UsingPassword="0",SessionTV="2025-12-11T00:03:04.189-0600"
  == Manager 'omnileads' logged off from 31.97.210.100
<--- Transmitting SIP request (435 bytes) to UDP:190.92.90.136:5060 --->
OPTIONS sip:xpb.cablecolor.hn:5060 SIP/2.0
Via: SIP/2.0/UDP 31.97.210.100:5060;rport;branch=z9hG4bKPj62ccf1aa-bdfa-4ca1-8fb8-af72f0bb0784
From: <sip:metrocom_in_aux@31.97.210.100>;tag=44d90b06-3183-48f9-877e-637966d3bc6b
To: <sip:xpb.cablecolor.hn>
Contact: <sip:metrocom_in_aux@31.97.210.100:5060>
Call-ID: 3a76d231-5bb6-430d-b8b4-dae07a824db0
CSeq: 14122 OPTIONS
Max-Forwards: 20
User-Agent: omnileads
Content-Length:  0


<--- Received SIP response (386 bytes) from UDP:190.92.90.136:5060 --->
SIP/2.0 404 Not Found
From: <sip:metrocom_in_aux@31.97.210.100>;tag=44d90b06-3183-48f9-877e-637966d3bc6b
To: <sip:xpb.cablecolor.hn>;tag=17a08fc7-56f9190d-4258b4-7fdf363efd58-100007f-13c4-7217
Call-ID: 3a76d231-5bb6-430d-b8b4-dae07a824db0
CSeq: 14122 OPTIONS
Via: SIP/2.0/UDP 31.97.210.100:5060;rport=5060;branch=z9hG4bKPj62ccf1aa-bdfa-4ca1-8fb8-af72f0bb0784
Content-Length: 0


<--- Received SIP request (477 bytes) from UDP:46.19.212.54:5060 --->
OPTIONS sip:s@31.97.210.100:5060 SIP/2.0
Via: SIP/2.0/UDP 46.19.212.54;branch=z9hG4bKa2b5.409faa536ac94ca9c0d37c55a5674a8a.0
Via: SIP/2.0/UDP 46.19.212.56;received=46.19.212.56;branch=z9hG4bKgihcXaix;rport=5060
From: sip:s@31.97.210.100:5060;tag=sip_registrar
To: sip:s@31.97.210.100:5060
CSeq: 10 OPTIONS
Call-ID: 16-76577FAC-693A5E9F00003EFD-F33FD6C0
Max-Forwards: 69
User-Agent: DIDWW Y SBC node
Contact: <sip:46.19.212.56:5060;transport=udp>
Content-Length: 0


<--- Transmitting SIP response (951 bytes) to UDP:46.19.212.54:5060 --->
SIP/2.0 404 Not Found
Via: SIP/2.0/UDP 46.19.212.54;rport=5060;received=46.19.212.54;branch=z9hG4bKa2b5.409faa536ac94ca9c0d37c55a5674a8a.0
Via: SIP/2.0/UDP 46.19.212.56;rport=5060;received=46.19.212.56;branch=z9hG4bKgihcXaix
Call-ID: 16-76577FAC-693A5E9F00003EFD-F33FD6C0
From: <sip:s@31.97.210.100>;tag=sip_registrar
To: <sip:s@31.97.210.100>;tag=z9hG4bKa2b5.409faa536ac94ca9c0d37c55a5674a8a.0
CSeq: 10 OPTIONS
Accept: application/xpidf+xml, application/cpim-pidf+xml, application/dialog-info+xml, application/simple-message-summary, application/pidf+xml, application/pidf+xml, application/dialog-info+xml, application/simple-message-summary, application/sdp, message/sipfrag;version=2.0
Allow: OPTIONS, REGISTER, SUBSCRIBE, NOTIFY, PUBLISH, INVITE, ACK, BYE, CANCEL, UPDATE, PRACK, INFO, MESSAGE, REFER
Supported: 100rel, timer, replaces, norefersub
Accept-Encoding: identity
Accept-Language: en
Server: omnileads
Content-Length:  0


<--- Received SIP request (477 bytes) from UDP:46.19.213.54:5060 --->
OPTIONS sip:s@31.97.210.100:5060 SIP/2.0
Via: SIP/2.0/UDP 46.19.213.54;branch=z9hG4bKc299.8f79d5e066733fbaed962c7e8a7527a6.0
Via: SIP/2.0/UDP 46.19.213.56;received=46.19.213.56;branch=z9hG4bKMFTDjaST;rport=5060
From: sip:s@31.97.210.100:5060;tag=sip_registrar
To: sip:s@31.97.210.100:5060
CSeq: 10 OPTIONS
Call-ID: 18-6C0A0CBE-693A5E9F0006F937-A47FB6C0
Max-Forwards: 69
User-Agent: DIDWW Y SBC node
Contact: <sip:46.19.213.56:5060;transport=udp>
Content-Length: 0


<--- Transmitting SIP response (951 bytes) to UDP:46.19.213.54:5060 --->
SIP/2.0 404 Not Found
Via: SIP/2.0/UDP 46.19.213.54;rport=5060;received=46.19.213.54;branch=z9hG4bKc299.8f79d5e066733fbaed962c7e8a7527a6.0
Via: SIP/2.0/UDP 46.19.213.56;rport=5060;received=46.19.213.56;branch=z9hG4bKMFTDjaST
Call-ID: 18-6C0A0CBE-693A5E9F0006F937-A47FB6C0
From: <sip:s@31.97.210.100>;tag=sip_registrar
To: <sip:s@31.97.210.100>;tag=z9hG4bKc299.8f79d5e066733fbaed962c7e8a7527a6.0
CSeq: 10 OPTIONS
Accept: application/xpidf+xml, application/cpim-pidf+xml, application/dialog-info+xml, application/simple-message-summary, application/pidf+xml, application/pidf+xml, application/dialog-info+xml, application/simple-message-summary, application/sdp, message/sipfrag;version=2.0
Allow: OPTIONS, REGISTER, SUBSCRIBE, NOTIFY, PUBLISH, INVITE, ACK, BYE, CANCEL, UPDATE, PRACK, INFO, MESSAGE, REFER
Supported: 100rel, timer, replaces, norefersub
Accept-Encoding: identity
Accept-Language: en
Server: omnileads
Content-Length:  0


  == Manager 'omnileads' logged on from 31.97.210.100
[Dec 11 00:03:12] SECURITY[73]: res_security_log.c:114 security_event_stasis_cb: SecurityEvent="SuccessfulAuth",EventTV="2025-12-11T00:03:12.206-0600",Severity="Informational",Service="AMI",EventVersion="1",AccountID="omnileads",SessionID="0x7f53cc010210",LocalAddress="IPV4/TCP/31.97.210.100/5038",RemoteAddress="IPV4/TCP/31.97.210.100/43986",UsingPassword="0",SessionTV="2025-12-11T00:03:12.206-0600"
  == Manager 'omnileads' logged off from 31.97.210.100
    -- Called 50662633553@classifier-originate
    -- Executing [50662633553@classifier-originate:1] NoOp("Local/50662633553@classifier-originate-00000036;2", "🔍 Classifier Originate → 50662633553") in new stack
    -- Executing [50662633553@classifier-originate:2] Set("Local/50662633553@classifier-originate-00000036;2", "CALLERID(num)=18887719500") in new stack
    -- Executing [50662633553@classifier-originate:3] Set("Local/50662633553@classifier-originate-00000036;2", "CALLERID(name)=Service Check") in new stack
    -- Executing [50662633553@classifier-originate:4] Set("Local/50662633553@classifier-originate-00000036;2", "NUM=+50662633553") in new stack
    -- Executing [50662633553@classifier-originate:5] Goto("Local/50662633553@classifier-originate-00000036;2", "classifier-out,+50662633553,1") in new stack
    -- Goto (classifier-out,+50662633553,1)
    -- Executing [+50662633553@classifier-out:1] NoOp("Local/50662633553@classifier-originate-00000036;2", "📡 CLASSIFIER ROUTING → +50662633553") in new stack
    -- Executing [+50662633553@classifier-out:2] Set("Local/50662633553@classifier-originate-00000036;2", "__DIAL_START=1765432992") in new stack
    -- Executing [+50662633553@classifier-out:3] GotoIf("Local/50662633553@classifier-originate-00000036;2", "0?use_local:use_tollfree") in new stack
    -- Goto (classifier-out,+50662633553,7)
    -- Executing [+50662633553@classifier-out:7] NoOp("Local/50662633553@classifier-originate-00000036;2", "🌍 ROW detected -> Using Telnyx TollFree") in new stack
    -- Executing [+50662633553@classifier-out:8] Dial("Local/50662633553@classifier-originate-00000036;2", "PJSIP/+50662633553@telnyx_tollfre_out,20,gU(classifier-answer-handler^+50662633553)") in new stack
    -- Called PJSIP/+50662633553@telnyx_tollfre_out
<--- Transmitting SIP request (966 bytes) to UDP:192.76.120.10:5060 --->
INVITE sip:+50662633553@sip.telnyx.com:5060 SIP/2.0
Via: SIP/2.0/UDP 31.97.210.100:5060;rport;branch=z9hG4bKPjbd365ecc-7b56-426b-9a8c-80db228440fe
From: "Service Check" <sip:18887719500@31.97.210.100>;tag=56fa941b-856f-493f-9ea2-31044ed9d4d1
To: <sip:+50662633553@sip.telnyx.com>
Contact: <sip:omnileads@31.97.210.100:5060>
Call-ID: 56730b53-05dd-47ca-9a2e-f9a9c1cc940d
CSeq: 30048 INVITE
Allow: OPTIONS, REGISTER, SUBSCRIBE, NOTIFY, PUBLISH, INVITE, ACK, BYE, CANCEL, UPDATE, PRACK, INFO, MESSAGE, REFER
Supported: 100rel, timer, replaces, norefersub, histinfo
Session-Expires: 1800
Min-SE: 90
Max-Forwards: 20
User-Agent: omnileads
Content-Type: application/sdp
Content-Length:   263

v=0
o=- 1116615172 1116615172 IN IP4 31.97.210.100
s=Asterisk
c=IN IP4 31.97.210.100
t=0 0
m=audio 46826 RTP/AVP 0 8 101
a=rtpmap:0 PCMU/8000
a=rtpmap:8 PCMA/8000
a=rtpmap:101 telephone-event/8000
a=fmtp:101 0-16
a=ptime:20
a=maxptime:140
a=sendrecv

<--- Received SIP response (400 bytes) from UDP:192.76.120.10:5060 --->
SIP/2.0 100 Telnyx Trying
Via: SIP/2.0/UDP 31.97.210.100:5060;rport=5060;received=31.97.210.100;branch=z9hG4bKPjbd365ecc-7b56-426b-9a8c-80db228440fe
From: "Service Check" <sip:18887719500@31.97.210.100>;tag=56fa941b-856f-493f-9ea2-31044ed9d4d1
To: <sip:+50662633553@sip.telnyx.com>
Call-ID: 56730b53-05dd-47ca-9a2e-f9a9c1cc940d
CSeq: 30048 INVITE
Server: Telnyx SIP Proxy
Content-Length: 0


<--- Received SIP response (760 bytes) from UDP:192.76.120.10:5060 --->
SIP/2.0 407 Proxy Authentication Required
Via: SIP/2.0/UDP 31.97.210.100:5060;received=31.97.210.100;rport=5060;branch=z9hG4bKPjbd365ecc-7b56-426b-9a8c-80db228440fe
From: "Service Check" <sip:18887719500@31.97.210.100>;tag=56fa941b-856f-493f-9ea2-31044ed9d4d1
To: <sip:+50662633553@sip.telnyx.com>;tag=UHUBrQ4Hj9K1j
Call-ID: 56730b53-05dd-47ca-9a2e-f9a9c1cc940d
CSeq: 30048 INVITE
Accept: application/sdp
Allow: INVITE, ACK, BYE, CANCEL, OPTIONS, MESSAGE, INFO, UPDATE, REFER, NOTIFY
Supported: path
Allow-Events: talk, hold, conference, refer
Proxy-Authenticate: Digest realm="sip.telnyx.com", nonce="2724c03b-7b1c-420b-99e7-e531d2156cd8", algorithm=MD5, qop="auth", opaque="fc8177d1-b1f4-4a93-ac90-2220f811f668/10.239.14.224"
Content-Length: 0


<--- Transmitting SIP request (426 bytes) to UDP:192.76.120.10:5060 --->
ACK sip:+50662633553@sip.telnyx.com:5060 SIP/2.0
Via: SIP/2.0/UDP 31.97.210.100:5060;rport;branch=z9hG4bKPjbd365ecc-7b56-426b-9a8c-80db228440fe
From: "Service Check" <sip:18887719500@31.97.210.100>;tag=56fa941b-856f-493f-9ea2-31044ed9d4d1
To: <sip:+50662633553@sip.telnyx.com>;tag=UHUBrQ4Hj9K1j
Call-ID: 56730b53-05dd-47ca-9a2e-f9a9c1cc940d
CSeq: 30048 ACK
Max-Forwards: 20
User-Agent: omnileads
Content-Length:  0


<--- Transmitting SIP request (1328 bytes) to UDP:192.76.120.10:5060 --->
INVITE sip:+50662633553@sip.telnyx.com:5060 SIP/2.0
Via: SIP/2.0/UDP 31.97.210.100:5060;rport;branch=z9hG4bKPjb8460a37-ad69-4f3b-846f-8e97d9d176ae
From: "Service Check" <sip:18887719500@31.97.210.100>;tag=56fa941b-856f-493f-9ea2-31044ed9d4d1
To: <sip:+50662633553@sip.telnyx.com>
Contact: <sip:omnileads@31.97.210.100:5060>
Call-ID: 56730b53-05dd-47ca-9a2e-f9a9c1cc940d
CSeq: 30049 INVITE
Allow: OPTIONS, REGISTER, SUBSCRIBE, NOTIFY, PUBLISH, INVITE, ACK, BYE, CANCEL, UPDATE, PRACK, INFO, MESSAGE, REFER
Supported: 100rel, timer, replaces, norefersub, histinfo
Session-Expires: 1800
Min-SE: 90
Max-Forwards: 20
User-Agent: omnileads
Proxy-Authorization: Digest username="userbryamlopez412598", realm="sip.telnyx.com", nonce="2724c03b-7b1c-420b-99e7-e531d2156cd8", uri="sip:+50662633553@sip.telnyx.com:5060", response="dde89edaffa7406b06ae2136a514a4c3", algorithm=MD5, cnonce="285bb44fd5ad4cb593c9649f3eddae85", opaque="fc8177d1-b1f4-4a93-ac90-2220f811f668/10.239.14.224", qop=auth, nc=00000001
Content-Type: application/sdp
Content-Length:   263

v=0
o=- 1116615172 1116615172 IN IP4 31.97.210.100
s=Asterisk
c=IN IP4 31.97.210.100
t=0 0
m=audio 46826 RTP/AVP 0 8 101
a=rtpmap:0 PCMU/8000
a=rtpmap:8 PCMA/8000
a=rtpmap:101 telephone-event/8000
a=fmtp:101 0-16
a=ptime:20
a=maxptime:140
a=sendrecv

<--- Received SIP response (400 bytes) from UDP:192.76.120.10:5060 --->
SIP/2.0 100 Telnyx Trying
Via: SIP/2.0/UDP 31.97.210.100:5060;rport=5060;received=31.97.210.100;branch=z9hG4bKPjb8460a37-ad69-4f3b-846f-8e97d9d176ae
From: "Service Check" <sip:18887719500@31.97.210.100>;tag=56fa941b-856f-493f-9ea2-31044ed9d4d1
To: <sip:+50662633553@sip.telnyx.com>
Call-ID: 56730b53-05dd-47ca-9a2e-f9a9c1cc940d
CSeq: 30049 INVITE
Server: Telnyx SIP Proxy
Content-Length: 0


<--- Received SIP response (642 bytes) from UDP:192.76.120.10:5060 --->
SIP/2.0 403 Unverified origination number D51
Via: SIP/2.0/UDP 31.97.210.100:5060;received=31.97.210.100;rport=5060;branch=z9hG4bKPjb8460a37-ad69-4f3b-846f-8e97d9d176ae
Max-Forwards: 19
From: "Service Check" <sip:18887719500@31.97.210.100>;tag=56fa941b-856f-493f-9ea2-31044ed9d4d1
To: <sip:+50662633553@sip.telnyx.com>;tag=vtm4SjNNFjame
Call-ID: 56730b53-05dd-47ca-9a2e-f9a9c1cc940d
CSeq: 30049 INVITE
Accept: application/sdp
Allow: INVITE, ACK, BYE, CANCEL, OPTIONS, MESSAGE, INFO, UPDATE, REFER, NOTIFY
Supported: path
Allow-Events: talk, hold, conference, refer
Reason: Q.850;cause=21;text="CALL_REJECTED"
Content-Length: 0


<--- Transmitting SIP request (426 bytes) to UDP:192.76.120.10:5060 --->
ACK sip:+50662633553@sip.telnyx.com:5060 SIP/2.0
Via: SIP/2.0/UDP 31.97.210.100:5060;rport;branch=z9hG4bKPjb8460a37-ad69-4f3b-846f-8e97d9d176ae
From: "Service Check" <sip:18887719500@31.97.210.100>;tag=56fa941b-856f-493f-9ea2-31044ed9d4d1
To: <sip:+50662633553@sip.telnyx.com>;tag=vtm4SjNNFjame
Call-ID: 56730b53-05dd-47ca-9a2e-f9a9c1cc940d
CSeq: 30049 ACK
Max-Forwards: 20
User-Agent: omnileads
Content-Length:  0


  == Everyone is busy/congested at this time (1:0/0/1)
    -- Executing [+50662633553@classifier-out:9] Goto("Local/50662633553@classifier-originate-00000036;2", "analyze") in new stack
    -- Goto (classifier-out,+50662633553,10)
    -- Executing [+50662633553@classifier-out:10] NoOp("Local/50662633553@classifier-originate-00000036;2", "📋 CLASSIFIER RESULT: Status=CHANUNAVAIL Cause=21") in new stack
    -- Executing [+50662633553@classifier-out:11] GotoIf("Local/50662633553@classifier-originate-00000036;2", "0?active") in new stack
    -- Executing [+50662633553@classifier-out:12] GotoIf("Local/50662633553@classifier-originate-00000036;2", "0?active") in new stack
    -- Executing [+50662633553@classifier-out:13] GotoIf("Local/50662633553@classifier-originate-00000036;2", "0?active") in new stack
    -- Executing [+50662633553@classifier-out:14] GotoIf("Local/50662633553@classifier-originate-00000036;2", "0?active") in new stack
    -- Executing [+50662633553@classifier-out:15] GotoIf("Local/50662633553@classifier-originate-00000036;2", "0?active") in new stack
    -- Executing [+50662633553@classifier-out:16] GotoIf("Local/50662633553@classifier-originate-00000036;2", "0?active") in new stack
    -- Executing [+50662633553@classifier-out:17] GotoIf("Local/50662633553@classifier-originate-00000036;2", "0?active") in new stack
    -- Executing [+50662633553@classifier-out:18] GotoIf("Local/50662633553@classifier-originate-00000036;2", "0?inactive") in new stack
    -- Executing [+50662633553@classifier-out:19] GotoIf("Local/50662633553@classifier-originate-00000036;2", "0?inactive") in new stack
    -- Executing [+50662633553@classifier-out:20] GotoIf("Local/50662633553@classifier-originate-00000036;2", "0?inactive") in new stack
    -- Executing [+50662633553@classifier-out:21] GotoIf("Local/50662633553@classifier-originate-00000036;2", "0?inactive") in new stack
    -- Executing [+50662633553@classifier-out:22] GotoIf("Local/50662633553@classifier-originate-00000036;2", "0?inactive") in new stack
    -- Executing [+50662633553@classifier-out:23] Goto("Local/50662633553@classifier-originate-00000036;2", "indeterminate") in new stack
    -- Goto (classifier-out,+50662633553,30)
    -- Executing [+50662633553@classifier-out:30] NoOp("Local/50662633553@classifier-originate-00000036;2", "⚠️ NUMBER STATUS INDETERMINATE") in new stack
    -- Executing [+50662633553@classifier-out:31] Set("Local/50662633553@classifier-originate-00000036;2", "CURL_RESULT=ERROR") in new stack
    -- Executing [+50662633553@classifier-out:32] Hangup("Local/50662633553@classifier-originate-00000036;2", "") in new stack
  == Spawn extension (classifier-out, +50662633553, 32) exited non-zero on 'Local/50662633553@classifier-originate-00000036;2'
<--- Received SIP request (485 bytes) from UDP:185.238.173.44:5060 --->
OPTIONS sip:s@31.97.210.100:5060 SIP/2.0
Via: SIP/2.0/UDP 185.238.173.44;branch=z9hG4bK554f.b9c655653486e90ec806386c828649a3.0
Via: SIP/2.0/UDP 185.238.173.56;received=185.238.173.56;branch=z9hG4bKBTGkPaE~;rport=5060
From: sip:s@31.97.210.100:5060;tag=sip_registrar
To: sip:s@31.97.210.100:5060
CSeq: 10 OPTIONS
Call-ID: 24-7D166785-693A5EA10002F7D6-02BFE6C0
Max-Forwards: 69
User-Agent: DIDWW Y SBC node
Contact: <sip:185.238.173.56:5060;transport=udp>
Content-Length: 0


<--- Transmitting SIP response (959 bytes) to UDP:185.238.173.44:5060 --->
SIP/2.0 404 Not Found
Via: SIP/2.0/UDP 185.238.173.44;rport=5060;received=185.238.173.44;branch=z9hG4bK554f.b9c655653486e90ec806386c828649a3.0
Via: SIP/2.0/UDP 185.238.173.56;rport=5060;received=185.238.173.56;branch=z9hG4bKBTGkPaE~
Call-ID: 24-7D166785-693A5EA10002F7D6-02BFE6C0
From: <sip:s@31.97.210.100>;tag=sip_registrar
To: <sip:s@31.97.210.100>;tag=z9hG4bK554f.b9c655653486e90ec806386c828649a3.0
CSeq: 10 OPTIONS
Accept: application/xpidf+xml, application/cpim-pidf+xml, application/dialog-info+xml, application/simple-message-summary, application/pidf+xml, application/pidf+xml, application/dialog-info+xml, application/simple-message-summary, application/sdp, message/sipfrag;version=2.0
Allow: OPTIONS, REGISTER, SUBSCRIBE, NOTIFY, PUBLISH, INVITE, ACK, BYE, CANCEL, UPDATE, PRACK, INFO, MESSAGE, REFER
Supported: 100rel, timer, replaces, norefersub
Accept-Encoding: identity
Accept-Language: en
Server: omnileads
Content-Length:  0
