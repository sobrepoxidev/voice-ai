[root@srv1137148 ~]# podman exec -it oml-asterisk-server bash
root@srv1137148:/# micro /etc/asterisk/oml_extensions_custom.conf
root@srv1137148:/# asterisk -rx "dialplan reload"ad"
Dialplan reloaded.
root@srv1137148:/# exit
exit
[root@srv1137148 ~]# podman exec -it oml-asterisk-server asterisk -rvvvvv
Asterisk 20.14.0, Copyright (C) 1999 - 2025, Sangoma Technologies Corporation and others.
Created by Mark Spencer <markster@digium.com>
Asterisk comes with ABSOLUTELY NO WARRANTY; type 'core show warranty' for details.
This is free software, with components licensed under the GNU General Public
License version 2 and other licenses; you are welcome to redistribute it under
certain conditions. Type 'core show license' for details.
=========================================================================
Connected to Asterisk 20.14.0 currently running on srv1137148 (pid = 1)
<--- Received SIP request (477 bytes) from UDP:46.19.213.54:5060 --->
OPTIONS sip:s@31.97.210.100:5060 SIP/2.0
Via: SIP/2.0/UDP 46.19.213.54;branch=z9hG4bK1e5e.1a9f7e80a2f87c48af703f7a9744266e.0
Via: SIP/2.0/UDP 46.19.213.56;received=46.19.213.56;branch=z9hG4bK0UwzWaAN;rport=5060
From: sip:s@31.97.210.100:5060;tag=sip_registrar
To: sip:s@31.97.210.100:5060
CSeq: 10 OPTIONS
Call-ID: 18-75D28034-693A436E0006F988-A47FB6C0
Max-Forwards: 69
User-Agent: DIDWW Y SBC node
Contact: <sip:46.19.213.56:5060;transport=udp>
Content-Length: 0


<--- Transmitting SIP response (951 bytes) to UDP:46.19.213.54:5060 --->
SIP/2.0 404 Not Found
Via: SIP/2.0/UDP 46.19.213.54;rport=5060;received=46.19.213.54;branch=z9hG4bK1e5e.1a9f7e80a2f87c48af703f7a9744266e.0
Via: SIP/2.0/UDP 46.19.213.56;rport=5060;received=46.19.213.56;branch=z9hG4bK0UwzWaAN
Call-ID: 18-75D28034-693A436E0006F988-A47FB6C0
From: <sip:s@31.97.210.100>;tag=sip_registrar
To: <sip:s@31.97.210.100>;tag=z9hG4bK1e5e.1a9f7e80a2f87c48af703f7a9744266e.0
CSeq: 10 OPTIONS
Accept: application/xpidf+xml, application/cpim-pidf+xml, application/dialog-info+xml, application/simple-message-summary, application/pidf+xml, application/pidf+xml, application/dialog-info+xml, application/simple-message-summary, application/sdp, message/sipfrag;version=2.0
Allow: OPTIONS, REGISTER, SUBSCRIBE, NOTIFY, PUBLISH, INVITE, ACK, BYE, CANCEL, UPDATE, PRACK, INFO, MESSAGE, REFER
Supported: 100rel, timer, replaces, norefersub
Accept-Encoding: identity
Accept-Language: en
Server: omnileads
Content-Length:  0


<--- Transmitting SIP request (409 bytes) to UDP:46.19.215.14:5060 --->
OPTIONS sip:46.19.215.14:5060 SIP/2.0
Via: SIP/2.0/UDP 31.97.210.100:5060;rport;branch=z9hG4bKPj2d8fe881-1c65-456a-a9d9-1854d5694257
From: <sip:didwwin@31.97.210.100>;tag=33a71a78-4c60-4b34-9e78-da757b3731b0
To: <sip:46.19.215.14>
Contact: <sip:didwwin@31.97.210.100:5060>
Call-ID: aaf448d5-29f2-4771-82ec-8e02e47313fa
CSeq: 60766 OPTIONS
Max-Forwards: 20
User-Agent: omnileads
Content-Length:  0


<--- Transmitting SIP request (409 bytes) to UDP:46.19.213.14:5060 --->
OPTIONS sip:46.19.213.14:5060 SIP/2.0
Via: SIP/2.0/UDP 31.97.210.100:5060;rport;branch=z9hG4bKPje605c76b-65d2-4d29-bfe9-e7d7ff8fa010
From: <sip:didwwin@31.97.210.100>;tag=3395a237-e40c-480b-8bc9-5e4fcc0efbd5
To: <sip:46.19.213.14>
Contact: <sip:didwwin@31.97.210.100:5060>
Call-ID: 8936c6ce-27db-4de8-8c9a-d7e804b2b17a
CSeq: 19438 OPTIONS
Max-Forwards: 20
User-Agent: omnileads
Content-Length:  0


<--- Transmitting SIP request (409 bytes) to UDP:46.19.212.14:5060 --->
OPTIONS sip:46.19.212.14:5060 SIP/2.0
Via: SIP/2.0/UDP 31.97.210.100:5060;rport;branch=z9hG4bKPjef272b21-d5ce-4dac-919d-8a9cfa1e6e7c
From: <sip:didwwin@31.97.210.100>;tag=8d7deb8c-2494-4e07-a189-126d18c9b3e5
To: <sip:46.19.212.14>
Contact: <sip:didwwin@31.97.210.100:5060>
Call-ID: 12555d9d-c5c6-471c-8627-21461e1ccdc2
CSeq: 56301 OPTIONS
Max-Forwards: 20
User-Agent: omnileads
Content-Length:  0


<--- Transmitting SIP request (409 bytes) to UDP:46.19.209.14:5060 --->
OPTIONS sip:46.19.209.14:5060 SIP/2.0
Via: SIP/2.0/UDP 31.97.210.100:5060;rport;branch=z9hG4bKPj1e0ca6da-9b0c-4404-afbc-28b2bcd9326b
From: <sip:didwwin@31.97.210.100>;tag=f064cc65-b6c9-432e-8109-229719bd6f26
To: <sip:46.19.209.14>
Contact: <sip:didwwin@31.97.210.100:5060>
Call-ID: 074666cc-01ce-4c80-9af4-472236ca4f9a
CSeq: 36567 OPTIONS
Max-Forwards: 20
User-Agent: omnileads
Content-Length:  0


<--- Transmitting SIP request (409 bytes) to UDP:46.19.214.14:5060 --->
OPTIONS sip:46.19.214.14:5060 SIP/2.0
Via: SIP/2.0/UDP 31.97.210.100:5060;rport;branch=z9hG4bKPjbb276bbe-2ac0-451c-a058-be20d9f67b90
From: <sip:didwwin@31.97.210.100>;tag=5c8c3087-763c-4749-8954-16e35d6bb469
To: <sip:46.19.214.14>
Contact: <sip:didwwin@31.97.210.100:5060>
Call-ID: 260412eb-18eb-4c3e-b2c9-c103c1e29a20
CSeq: 42890 OPTIONS
Max-Forwards: 20
User-Agent: omnileads
Content-Length:  0


<--- Transmitting SIP request (409 bytes) to UDP:46.19.210.14:5060 --->
OPTIONS sip:46.19.210.14:5060 SIP/2.0
Via: SIP/2.0/UDP 31.97.210.100:5060;rport;branch=z9hG4bKPja7552630-ea51-4f2b-90f2-bb6989ebe68b
From: <sip:didwwin@31.97.210.100>;tag=ab7b30f2-8c13-41a2-9976-47a4e457fd3a
To: <sip:46.19.210.14>
Contact: <sip:didwwin@31.97.210.100:5060>
Call-ID: 42583fc6-4a73-4617-9814-c050a7c4d0fc
CSeq: 26596 OPTIONS
Max-Forwards: 20
User-Agent: omnileads
Content-Length:  0


<--- Received SIP response (403 bytes) from UDP:46.19.212.14:5060 --->
SIP/2.0 200 OK
Via: SIP/2.0/UDP 31.97.210.100:5060;rport=5060;branch=z9hG4bKPjef272b21-d5ce-4dac-919d-8a9cfa1e6e7c;received=31.97.210.100
From: <sip:didwwin@31.97.210.100>;tag=8d7deb8c-2494-4e07-a189-126d18c9b3e5
To: <sip:46.19.212.14>;tag=3da5f524088720f97d47b11b6f6c07d2.5ca031f4
Call-ID: 12555d9d-c5c6-471c-8627-21461e1ccdc2
CSeq: 56301 OPTIONS
Server: OOD responder v982
Content-Length: 0


<--- Received SIP response (403 bytes) from UDP:46.19.213.14:5060 --->
SIP/2.0 200 OK
Via: SIP/2.0/UDP 31.97.210.100:5060;rport=5060;branch=z9hG4bKPje605c76b-65d2-4d29-bfe9-e7d7ff8fa010;received=31.97.210.100
From: <sip:didwwin@31.97.210.100>;tag=3395a237-e40c-480b-8bc9-5e4fcc0efbd5
To: <sip:46.19.213.14>;tag=38a0c2c677151c484275ef4c700e9780.377be1d9
Call-ID: 8936c6ce-27db-4de8-8c9a-d7e804b2b17a
CSeq: 19438 OPTIONS
Server: OOD responder v982
Content-Length: 0


<--- Received SIP response (403 bytes) from UDP:46.19.209.14:5060 --->
SIP/2.0 200 OK
Via: SIP/2.0/UDP 31.97.210.100:5060;rport=5060;branch=z9hG4bKPj1e0ca6da-9b0c-4404-afbc-28b2bcd9326b;received=31.97.210.100
From: <sip:didwwin@31.97.210.100>;tag=f064cc65-b6c9-432e-8109-229719bd6f26
To: <sip:46.19.209.14>;tag=815cbf4cfc3e75322dd43ade78dddabe.7dc4a827
Call-ID: 074666cc-01ce-4c80-9af4-472236ca4f9a
CSeq: 36567 OPTIONS
Server: OOD responder v982
Content-Length: 0


<--- Received SIP response (403 bytes) from UDP:46.19.210.14:5060 --->
SIP/2.0 200 OK
Via: SIP/2.0/UDP 31.97.210.100:5060;rport=5060;received=31.97.210.100;branch=z9hG4bKPja7552630-ea51-4f2b-90f2-bb6989ebe68b
From: <sip:didwwin@31.97.210.100>;tag=ab7b30f2-8c13-41a2-9976-47a4e457fd3a
To: <sip:46.19.210.14>;tag=96ef325e4e1162bc586f6ca7aebc6156.f70202ca
Call-ID: 42583fc6-4a73-4617-9814-c050a7c4d0fc
CSeq: 26596 OPTIONS
Server: OOD responder v982
Content-Length: 0


<--- Received SIP response (403 bytes) from UDP:46.19.215.14:5060 --->
SIP/2.0 200 OK
Via: SIP/2.0/UDP 31.97.210.100:5060;rport=5060;branch=z9hG4bKPj2d8fe881-1c65-456a-a9d9-1854d5694257;received=31.97.210.100
From: <sip:didwwin@31.97.210.100>;tag=33a71a78-4c60-4b34-9e78-da757b3731b0
To: <sip:46.19.215.14>;tag=55c2b85e75369b5eabe2298586181ab0.c85c7e80
Call-ID: aaf448d5-29f2-4771-82ec-8e02e47313fa
CSeq: 60766 OPTIONS
Server: OOD responder v982
Content-Length: 0


<--- Received SIP response (403 bytes) from UDP:46.19.214.14:5060 --->
SIP/2.0 200 OK
Via: SIP/2.0/UDP 31.97.210.100:5060;rport=5060;branch=z9hG4bKPjbb276bbe-2ac0-451c-a058-be20d9f67b90;received=31.97.210.100
From: <sip:didwwin@31.97.210.100>;tag=5c8c3087-763c-4749-8954-16e35d6bb469
To: <sip:46.19.214.14>;tag=bddf0df813859b89a3162cb18023743a.569c43b1
Call-ID: 260412eb-18eb-4c3e-b2c9-c103c1e29a20
CSeq: 42890 OPTIONS
Server: OOD responder v982
Content-Length: 0


<--- Transmitting SIP request (425 bytes) to UDP:127.0.0.1:10060 --->
OPTIONS sip:1002@127.0.0.1:10060 SIP/2.0
Via: SIP/2.0/UDP 31.97.210.100:5160;rport;branch=z9hG4bKPj62d8389c-149b-4374-9713-92f96546d77d
From: <sip:1002@31.97.210.100>;tag=ebc5fe77-8189-4aec-ac0f-058128260a01
To: <sip:1002@127.0.0.1>
Contact: <sip:1002@31.97.210.100:5160>
Call-ID: 47b10717-6644-47ff-98c6-1799035bfd5d
CSeq: 49366 OPTIONS
Supported: path
Max-Forwards: 20
User-Agent: omnileads
Content-Length:  0


<--- Received SIP response (477 bytes) from UDP:127.0.0.1:10060 --->
SIP/2.0 200 OK
Via: SIP/2.0/UDP 31.97.210.100:5160;received=31.97.210.100;rport=5160;branch=z9hG4bKPj62d8389c-149b-4374-9713-92f96546d77d
To: <sip:1002@127.0.0.1>;tag=spcis11bed
From: <sip:1002@31.97.210.100>;tag=ebc5fe77-8189-4aec-ac0f-058128260a01
Call-ID: 47b10717-6644-47ff-98c6-1799035bfd5d
CSeq: 49366 OPTIONS
Allow: INVITE,ACK,CANCEL,BYE,UPDATE,MESSAGE,OPTIONS,REFER,INFO
Accept: application/sdp, application/dtmf-relay
Supported: outbound
Content-Length: 0


<--- Received SIP request (477 bytes) from UDP:46.19.212.54:5060 --->
OPTIONS sip:s@31.97.210.100:5060 SIP/2.0
Via: SIP/2.0/UDP 46.19.212.54;branch=z9hG4bKe328.74fe7c8c227d8a23ab88dc3e7e7a2193.0
Via: SIP/2.0/UDP 46.19.212.56;received=46.19.212.56;branch=z9hG4bKQ46BKaUH;rport=5060
From: sip:s@31.97.210.100:5060;tag=sip_registrar
To: sip:s@31.97.210.100:5060
CSeq: 10 OPTIONS
Call-ID: 16-0C266140-693A437800003F04-F33FD6C0
Max-Forwards: 69
User-Agent: DIDWW Y SBC node
Contact: <sip:46.19.212.56:5060;transport=udp>
Content-Length: 0


<--- Transmitting SIP response (951 bytes) to UDP:46.19.212.54:5060 --->
SIP/2.0 404 Not Found
Via: SIP/2.0/UDP 46.19.212.54;rport=5060;received=46.19.212.54;branch=z9hG4bKe328.74fe7c8c227d8a23ab88dc3e7e7a2193.0
Via: SIP/2.0/UDP 46.19.212.56;rport=5060;received=46.19.212.56;branch=z9hG4bKQ46BKaUH
Call-ID: 16-0C266140-693A437800003F04-F33FD6C0
From: <sip:s@31.97.210.100>;tag=sip_registrar
To: <sip:s@31.97.210.100>;tag=z9hG4bKe328.74fe7c8c227d8a23ab88dc3e7e7a2193.0
CSeq: 10 OPTIONS
Accept: application/xpidf+xml, application/cpim-pidf+xml, application/dialog-info+xml, application/simple-message-summary, application/pidf+xml, application/pidf+xml, application/dialog-info+xml, application/simple-message-summary, application/sdp, message/sipfrag;version=2.0
Allow: OPTIONS, REGISTER, SUBSCRIBE, NOTIFY, PUBLISH, INVITE, ACK, BYE, CANCEL, UPDATE, PRACK, INFO, MESSAGE, REFER
Supported: 100rel, timer, replaces, norefersub
Accept-Encoding: identity
Accept-Language: en
Server: omnileads
Content-Length:  0


[Dec 10 22:07:20] NOTICE[28451]: manager.c:2350 authenticate: 194.87.35.180 tried to authenticate with nonexistent user 'ZRG_1'
[Dec 10 22:07:20] NOTICE[28451]: manager.c:2387 authenticate: 194.87.35.180 failed to authenticate as 'ZRG_1'
[Dec 10 22:07:20] SECURITY[73]: res_security_log.c:114 security_event_stasis_cb: SecurityEvent="InvalidAccountID",EventTV="2025-12-10T22:07:20.336-0600",Severity="Error",Service="AMI",EventVersion="1",AccountID="ZRG_1",SessionID="0x7f5471043460",LocalAddress="IPV4/TCP/31.97.210.100/5038",RemoteAddress="IPV4/TCP/194.87.35.180/52112",SessionTV="1969-12-31T18:00:00.000-0600"
<--- Received SIP request (477 bytes) from UDP:46.19.212.54:5060 --->
OPTIONS sip:s@31.97.210.100:5060 SIP/2.0
Via: SIP/2.0/UDP 46.19.212.54;branch=z9hG4bK989f.31e673001554862bd6af95e0eca06e38.0
Via: SIP/2.0/UDP 46.19.212.55;received=46.19.212.55;branch=z9hG4bKGnI71aOM;rport=5060
From: sip:s@31.97.210.100:5060;tag=sip_registrar
To: sip:s@31.97.210.100:5060
CSeq: 10 OPTIONS
Call-ID: 15-32F481C2-693A43780005C413-312FB6C0
Max-Forwards: 69
User-Agent: DIDWW Y SBC node
Contact: <sip:46.19.212.55:5060;transport=udp>
Content-Length: 0


<--- Transmitting SIP response (951 bytes) to UDP:46.19.212.54:5060 --->
SIP/2.0 404 Not Found
Via: SIP/2.0/UDP 46.19.212.54;rport=5060;received=46.19.212.54;branch=z9hG4bK989f.31e673001554862bd6af95e0eca06e38.0
Via: SIP/2.0/UDP 46.19.212.55;rport=5060;received=46.19.212.55;branch=z9hG4bKGnI71aOM
Call-ID: 15-32F481C2-693A43780005C413-312FB6C0
From: <sip:s@31.97.210.100>;tag=sip_registrar
To: <sip:s@31.97.210.100>;tag=z9hG4bK989f.31e673001554862bd6af95e0eca06e38.0
CSeq: 10 OPTIONS
Accept: application/xpidf+xml, application/cpim-pidf+xml, application/dialog-info+xml, application/simple-message-summary, application/pidf+xml, application/pidf+xml, application/dialog-info+xml, application/simple-message-summary, application/sdp, message/sipfrag;version=2.0
Allow: OPTIONS, REGISTER, SUBSCRIBE, NOTIFY, PUBLISH, INVITE, ACK, BYE, CANCEL, UPDATE, PRACK, INFO, MESSAGE, REFER
Supported: 100rel, timer, replaces, norefersub
Accept-Encoding: identity
Accept-Language: en
Server: omnileads
Content-Length:  0


<--- Received SIP request (476 bytes) from UDP:46.19.210.19:5060 --->
OPTIONS sip:s@31.97.210.100:5060 SIP/2.0
Via: SIP/2.0/UDP 46.19.210.19;branch=z9hG4bK5ec.221145e530d81fe99c8c4e5677b03ec8.0
Via: SIP/2.0/UDP 46.19.210.21;received=46.19.210.21;branch=z9hG4bK5uDLvapm;rport=5060
From: sip:s@31.97.210.100:5060;tag=sip_registrar
To: sip:s@31.97.210.100:5060
CSeq: 10 OPTIONS
Call-ID: 12-5DECD3D3-693A437900016D52-891FA6C0
Max-Forwards: 69
User-Agent: DIDWW Y SBC node
Contact: <sip:46.19.210.21:5060;transport=udp>
Content-Length: 0


<--- Transmitting SIP response (949 bytes) to UDP:46.19.210.19:5060 --->
SIP/2.0 404 Not Found
Via: SIP/2.0/UDP 46.19.210.19;rport=5060;received=46.19.210.19;branch=z9hG4bK5ec.221145e530d81fe99c8c4e5677b03ec8.0
Via: SIP/2.0/UDP 46.19.210.21;rport=5060;received=46.19.210.21;branch=z9hG4bK5uDLvapm
Call-ID: 12-5DECD3D3-693A437900016D52-891FA6C0
From: <sip:s@31.97.210.100>;tag=sip_registrar
To: <sip:s@31.97.210.100>;tag=z9hG4bK5ec.221145e530d81fe99c8c4e5677b03ec8.0
CSeq: 10 OPTIONS
Accept: application/xpidf+xml, application/cpim-pidf+xml, application/dialog-info+xml, application/simple-message-summary, application/pidf+xml, application/pidf+xml, application/dialog-info+xml, application/simple-message-summary, application/sdp, message/sipfrag;version=2.0
Allow: OPTIONS, REGISTER, SUBSCRIBE, NOTIFY, PUBLISH, INVITE, ACK, BYE, CANCEL, UPDATE, PRACK, INFO, MESSAGE, REFER
Supported: 100rel, timer, replaces, norefersub
Accept-Encoding: identity
Accept-Language: en
Server: omnileads
Content-Length:  0


  == Connect attempt from '194.87.35.180' unable to authenticate
<--- Received SIP request (477 bytes) from UDP:46.19.213.54:5060 --->
OPTIONS sip:s@31.97.210.100:5060 SIP/2.0
Via: SIP/2.0/UDP 46.19.213.54;branch=z9hG4bK8ac7.cd77e719829366a229b959b154303d2e.0
Via: SIP/2.0/UDP 46.19.213.55;received=46.19.213.55;branch=z9hG4bKV4fxba8j;rport=5060
From: sip:s@31.97.210.100:5060;tag=sip_registrar
To: sip:s@31.97.210.100:5060
CSeq: 10 OPTIONS
Call-ID: 17-09405DAC-693A4379000B855F-F29FC6C0
Max-Forwards: 69
User-Agent: DIDWW Y SBC node
Contact: <sip:46.19.213.55:5060;transport=udp>
Content-Length: 0


<--- Transmitting SIP response (951 bytes) to UDP:46.19.213.54:5060 --->
SIP/2.0 404 Not Found
Via: SIP/2.0/UDP 46.19.213.54;rport=5060;received=46.19.213.54;branch=z9hG4bK8ac7.cd77e719829366a229b959b154303d2e.0
Via: SIP/2.0/UDP 46.19.213.55;rport=5060;received=46.19.213.55;branch=z9hG4bKV4fxba8j
Call-ID: 17-09405DAC-693A4379000B855F-F29FC6C0
From: <sip:s@31.97.210.100>;tag=sip_registrar
To: <sip:s@31.97.210.100>;tag=z9hG4bK8ac7.cd77e719829366a229b959b154303d2e.0
CSeq: 10 OPTIONS
Accept: application/xpidf+xml, application/cpim-pidf+xml, application/dialog-info+xml, application/simple-message-summary, application/pidf+xml, application/pidf+xml, application/dialog-info+xml, application/simple-message-summary, application/sdp, message/sipfrag;version=2.0
Allow: OPTIONS, REGISTER, SUBSCRIBE, NOTIFY, PUBLISH, INVITE, ACK, BYE, CANCEL, UPDATE, PRACK, INFO, MESSAGE, REFER
Supported: 100rel, timer, replaces, norefersub
Accept-Encoding: identity
Accept-Language: en
Server: omnileads
Content-Length:  0


  == Manager 'omnileads' logged on from 31.97.210.100
[Dec 10 22:07:22] SECURITY[73]: res_security_log.c:114 security_event_stasis_cb: SecurityEvent="SuccessfulAuth",EventTV="2025-12-10T22:07:22.031-0600",Severity="Informational",Service="AMI",EventVersion="1",AccountID="omnileads",SessionID="0x7f53c41194c0",LocalAddress="IPV4/TCP/31.97.210.100/5038",RemoteAddress="IPV4/TCP/31.97.210.100/46616",UsingPassword="0",SessionTV="2025-12-10T22:07:22.031-0600"
  == Manager 'omnileads' logged off from 31.97.210.100
<--- Received SIP request (485 bytes) from UDP:185.238.173.44:5060 --->
OPTIONS sip:s@31.97.210.100:5060 SIP/2.0
Via: SIP/2.0/UDP 185.238.173.44;branch=z9hG4bK4712.829368f9af209d065d34b9ab9ba0ab5d.0
Via: SIP/2.0/UDP 185.238.173.56;received=185.238.173.56;branch=z9hG4bKGcPiRaKi;rport=5060
From: sip:s@31.97.210.100:5060;tag=sip_registrar
To: sip:s@31.97.210.100:5060
CSeq: 10 OPTIONS
Call-ID: 24-44B6F903-693A437C0002FB33-02BFE6C0
Max-Forwards: 69
User-Agent: DIDWW Y SBC node
Contact: <sip:185.238.173.56:5060;transport=udp>
Content-Length: 0


<--- Transmitting SIP response (959 bytes) to UDP:185.238.173.44:5060 --->
SIP/2.0 404 Not Found
Via: SIP/2.0/UDP 185.238.173.44;rport=5060;received=185.238.173.44;branch=z9hG4bK4712.829368f9af209d065d34b9ab9ba0ab5d.0
Via: SIP/2.0/UDP 185.238.173.56;rport=5060;received=185.238.173.56;branch=z9hG4bKGcPiRaKi
Call-ID: 24-44B6F903-693A437C0002FB33-02BFE6C0
From: <sip:s@31.97.210.100>;tag=sip_registrar
To: <sip:s@31.97.210.100>;tag=z9hG4bK4712.829368f9af209d065d34b9ab9ba0ab5d.0
CSeq: 10 OPTIONS
Accept: application/xpidf+xml, application/cpim-pidf+xml, application/dialog-info+xml, application/simple-message-summary, application/pidf+xml, application/pidf+xml, application/dialog-info+xml, application/simple-message-summary, application/sdp, message/sipfrag;version=2.0
Allow: OPTIONS, REGISTER, SUBSCRIBE, NOTIFY, PUBLISH, INVITE, ACK, BYE, CANCEL, UPDATE, PRACK, INFO, MESSAGE, REFER
Supported: 100rel, timer, replaces, norefersub
Accept-Encoding: identity
Accept-Language: en
Server: omnileads
Content-Length:  0


<--- Received SIP request (477 bytes) from UDP:46.19.209.44:5060 --->
OPTIONS sip:s@31.97.210.100:5060 SIP/2.0
Via: SIP/2.0/UDP 46.19.209.44;branch=z9hG4bKf07b.b7b1c607a31db8d3889a2813798d8ab2.0
Via: SIP/2.0/UDP 46.19.209.17;received=46.19.209.17;branch=z9hG4bKQb9s5a3D;rport=5060
From: sip:s@31.97.210.100:5060;tag=sip_registrar
To: sip:s@31.97.210.100:5060
CSeq: 10 OPTIONS
Call-ID: 10-1BFFE7DF-693A437D000406F4-4A9FF6C0
Max-Forwards: 69
User-Agent: DIDWW Y SBC node
Contact: <sip:46.19.209.17:5060;transport=udp>
Content-Length: 0


<--- Transmitting SIP response (951 bytes) to UDP:46.19.209.44:5060 --->
SIP/2.0 404 Not Found
Via: SIP/2.0/UDP 46.19.209.44;rport=5060;received=46.19.209.44;branch=z9hG4bKf07b.b7b1c607a31db8d3889a2813798d8ab2.0
Via: SIP/2.0/UDP 46.19.209.17;rport=5060;received=46.19.209.17;branch=z9hG4bKQb9s5a3D
Call-ID: 10-1BFFE7DF-693A437D000406F4-4A9FF6C0
From: <sip:s@31.97.210.100>;tag=sip_registrar
To: <sip:s@31.97.210.100>;tag=z9hG4bKf07b.b7b1c607a31db8d3889a2813798d8ab2.0
CSeq: 10 OPTIONS
Accept: application/xpidf+xml, application/cpim-pidf+xml, application/dialog-info+xml, application/simple-message-summary, application/pidf+xml, application/pidf+xml, application/dialog-info+xml, application/simple-message-summary, application/sdp, message/sipfrag;version=2.0
Allow: OPTIONS, REGISTER, SUBSCRIBE, NOTIFY, PUBLISH, INVITE, ACK, BYE, CANCEL, UPDATE, PRACK, INFO, MESSAGE, REFER
Supported: 100rel, timer, replaces, norefersub
Accept-Encoding: identity
Accept-Language: en
Server: omnileads
Content-Length:  0


<--- Received SIP request (485 bytes) from UDP:185.238.173.44:5060 --->
OPTIONS sip:s@31.97.210.100:5060 SIP/2.0
Via: SIP/2.0/UDP 185.238.173.44;branch=z9hG4bKcd2c.defbcc9187df8eb8065fad76adcbb915.0
Via: SIP/2.0/UDP 185.238.173.55;received=185.238.173.55;branch=z9hG4bKvtCoga~U;rport=5060
From: sip:s@31.97.210.100:5060;tag=sip_registrar
To: sip:s@31.97.210.100:5060
CSeq: 10 OPTIONS
Call-ID: 23-32E72CFA-693A437E0005D9F1-76BFE6C0
Max-Forwards: 69
User-Agent: DIDWW Y SBC node
Contact: <sip:185.238.173.55:5060;transport=udp>
Content-Length: 0


<--- Transmitting SIP response (959 bytes) to UDP:185.238.173.44:5060 --->
SIP/2.0 404 Not Found
Via: SIP/2.0/UDP 185.238.173.44;rport=5060;received=185.238.173.44;branch=z9hG4bKcd2c.defbcc9187df8eb8065fad76adcbb915.0
Via: SIP/2.0/UDP 185.238.173.55;rport=5060;received=185.238.173.55;branch=z9hG4bKvtCoga~U
Call-ID: 23-32E72CFA-693A437E0005D9F1-76BFE6C0
From: <sip:s@31.97.210.100>;tag=sip_registrar
To: <sip:s@31.97.210.100>;tag=z9hG4bKcd2c.defbcc9187df8eb8065fad76adcbb915.0
CSeq: 10 OPTIONS
Accept: application/xpidf+xml, application/cpim-pidf+xml, application/dialog-info+xml, application/simple-message-summary, application/pidf+xml, application/pidf+xml, application/dialog-info+xml, application/simple-message-summary, application/sdp, message/sipfrag;version=2.0
Allow: OPTIONS, REGISTER, SUBSCRIBE, NOTIFY, PUBLISH, INVITE, ACK, BYE, CANCEL, UPDATE, PRACK, INFO, MESSAGE, REFER
Supported: 100rel, timer, replaces, norefersub
Accept-Encoding: identity
Accept-Language: en
Server: omnileads
Content-Length:  0


<--- Transmitting SIP request (429 bytes) to UDP:190.92.90.136:5060 --->
OPTIONS sip:xpb.cablecolor.hn:5060 SIP/2.0
Via: SIP/2.0/UDP 31.97.210.100:5060;rport;branch=z9hG4bKPj718ed13f-0352-421e-a67c-dc1d66afca0c
From: <sip:50642052929@xpb.cablecolor.hn>;tag=4111f925-b4c8-4ca5-a531-280bd1c07e3c
To: <sip:xpb.cablecolor.hn>
Contact: <sip:omnileads@31.97.210.100:5060>
Call-ID: 278736ae-7487-4c2f-b09e-59e7f72f64ee
CSeq: 52044 OPTIONS
Max-Forwards: 20
User-Agent: omnileads
Content-Length:  0


<--- Received SIP response (386 bytes) from UDP:190.92.90.136:5060 --->
SIP/2.0 404 Not Found
From: <sip:50642052929@xpb.cablecolor.hn>;tag=4111f925-b4c8-4ca5-a531-280bd1c07e3c
To: <sip:xpb.cablecolor.hn>;tag=2dc6f416-3cdf07e7-423d9a-7fdf3838cdf8-100007f-13c4-7217
Call-ID: 278736ae-7487-4c2f-b09e-59e7f72f64ee
CSeq: 52044 OPTIONS
Via: SIP/2.0/UDP 31.97.210.100:5060;rport=5060;branch=z9hG4bKPj718ed13f-0352-421e-a67c-dc1d66afca0c
Content-Length: 0


<--- Received SIP request (477 bytes) from UDP:46.19.214.54:5060 --->
OPTIONS sip:s@31.97.210.100:5060 SIP/2.0
Via: SIP/2.0/UDP 46.19.214.54;branch=z9hG4bK06cf.c742a888f85481031c80109f44e83a6d.0
Via: SIP/2.0/UDP 46.19.214.56;received=46.19.214.56;branch=z9hG4bKl~ZJJai8;rport=5060
From: sip:s@31.97.210.100:5060;tag=sip_registrar
To: sip:s@31.97.210.100:5060
CSeq: 10 OPTIONS
Call-ID: 20-34E48570-693A4381000356DA-D46FC6C0
Max-Forwards: 69
User-Agent: DIDWW Y SBC node
Contact: <sip:46.19.214.56:5060;transport=udp>
Content-Length: 0


<--- Transmitting SIP response (951 bytes) to UDP:46.19.214.54:5060 --->
SIP/2.0 404 Not Found
Via: SIP/2.0/UDP 46.19.214.54;rport=5060;received=46.19.214.54;branch=z9hG4bK06cf.c742a888f85481031c80109f44e83a6d.0
Via: SIP/2.0/UDP 46.19.214.56;rport=5060;received=46.19.214.56;branch=z9hG4bKl~ZJJai8
Call-ID: 20-34E48570-693A4381000356DA-D46FC6C0
From: <sip:s@31.97.210.100>;tag=sip_registrar
To: <sip:s@31.97.210.100>;tag=z9hG4bK06cf.c742a888f85481031c80109f44e83a6d.0
CSeq: 10 OPTIONS
Accept: application/xpidf+xml, application/cpim-pidf+xml, application/dialog-info+xml, application/simple-message-summary, application/pidf+xml, application/pidf+xml, application/dialog-info+xml, application/simple-message-summary, application/sdp, message/sipfrag;version=2.0
Allow: OPTIONS, REGISTER, SUBSCRIBE, NOTIFY, PUBLISH, INVITE, ACK, BYE, CANCEL, UPDATE, PRACK, INFO, MESSAGE, REFER
Supported: 100rel, timer, replaces, norefersub
Accept-Encoding: identity
Accept-Language: en
Server: omnileads
Content-Length:  0


<--- Received SIP request (477 bytes) from UDP:46.19.210.19:5060 --->
OPTIONS sip:s@31.97.210.100:5060 SIP/2.0
Via: SIP/2.0/UDP 46.19.210.19;branch=z9hG4bK90ad.9fee1a4be3ee742fd6bac0da0a72f7c3.0
Via: SIP/2.0/UDP 46.19.210.17;received=46.19.210.17;branch=z9hG4bKmZkXcaqb;rport=5060
From: sip:s@31.97.210.100:5060;tag=sip_registrar
To: sip:s@31.97.210.100:5060
CSeq: 10 OPTIONS
Call-ID: 13-11AD0D85-693A43840002662A-80AFC6C0
Max-Forwards: 69
User-Agent: DIDWW Y SBC node
Contact: <sip:46.19.210.17:5060;transport=udp>
Content-Length: 0


<--- Transmitting SIP response (951 bytes) to UDP:46.19.210.19:5060 --->
SIP/2.0 404 Not Found
Via: SIP/2.0/UDP 46.19.210.19;rport=5060;received=46.19.210.19;branch=z9hG4bK90ad.9fee1a4be3ee742fd6bac0da0a72f7c3.0
Via: SIP/2.0/UDP 46.19.210.17;rport=5060;received=46.19.210.17;branch=z9hG4bKmZkXcaqb
Call-ID: 13-11AD0D85-693A43840002662A-80AFC6C0
From: <sip:s@31.97.210.100>;tag=sip_registrar
To: <sip:s@31.97.210.100>;tag=z9hG4bK90ad.9fee1a4be3ee742fd6bac0da0a72f7c3.0
CSeq: 10 OPTIONS
Accept: application/xpidf+xml, application/cpim-pidf+xml, application/dialog-info+xml, application/simple-message-summary, application/pidf+xml, application/pidf+xml, application/dialog-info+xml, application/simple-message-summary, application/sdp, message/sipfrag;version=2.0
Allow: OPTIONS, REGISTER, SUBSCRIBE, NOTIFY, PUBLISH, INVITE, ACK, BYE, CANCEL, UPDATE, PRACK, INFO, MESSAGE, REFER
Supported: 100rel, timer, replaces, norefersub
Accept-Encoding: identity
Accept-Language: en
Server: omnileads
Content-Length:  0


<--- Received SIP request (477 bytes) from UDP:46.19.209.44:5060 --->
OPTIONS sip:s@31.97.210.100:5060 SIP/2.0
Via: SIP/2.0/UDP 46.19.209.44;branch=z9hG4bK5f27.557089342f997849a5f801aa6d5d523a.0
Via: SIP/2.0/UDP 46.19.209.45;received=46.19.209.45;branch=z9hG4bKF66kcaFN;rport=5060
From: sip:s@31.97.210.100:5060;tag=sip_registrar
To: sip:s@31.97.210.100:5060
CSeq: 10 OPTIONS
Call-ID: 11-7C1D9C02-693A4384000EF737-AEBFB6C0
Max-Forwards: 69
User-Agent: DIDWW Y SBC node
Contact: <sip:46.19.209.45:5060;transport=udp>
Content-Length: 0


<--- Transmitting SIP response (951 bytes) to UDP:46.19.209.44:5060 --->
SIP/2.0 404 Not Found
Via: SIP/2.0/UDP 46.19.209.44;rport=5060;received=46.19.209.44;branch=z9hG4bK5f27.557089342f997849a5f801aa6d5d523a.0
Via: SIP/2.0/UDP 46.19.209.45;rport=5060;received=46.19.209.45;branch=z9hG4bKF66kcaFN
Call-ID: 11-7C1D9C02-693A4384000EF737-AEBFB6C0
From: <sip:s@31.97.210.100>;tag=sip_registrar
To: <sip:s@31.97.210.100>;tag=z9hG4bK5f27.557089342f997849a5f801aa6d5d523a.0
CSeq: 10 OPTIONS
Accept: application/xpidf+xml, application/cpim-pidf+xml, application/dialog-info+xml, application/simple-message-summary, application/pidf+xml, application/pidf+xml, application/dialog-info+xml, application/simple-message-summary, application/sdp, message/sipfrag;version=2.0
Allow: OPTIONS, REGISTER, SUBSCRIBE, NOTIFY, PUBLISH, INVITE, ACK, BYE, CANCEL, UPDATE, PRACK, INFO, MESSAGE, REFER
Supported: 100rel, timer, replaces, norefersub
Accept-Encoding: identity
Accept-Language: en
Server: omnileads
Content-Length:  0


<--- Received SIP request (477 bytes) from UDP:46.19.214.54:5060 --->
OPTIONS sip:s@31.97.210.100:5060 SIP/2.0
Via: SIP/2.0/UDP 46.19.214.54;branch=z9hG4bK8b22.518fa17f2a843eebbbffbcb023c184c3.0
Via: SIP/2.0/UDP 46.19.214.55;received=46.19.214.55;branch=z9hG4bKZbJLJaEx;rport=5060
From: sip:s@31.97.210.100:5060;tag=sip_registrar
To: sip:s@31.97.210.100:5060
CSeq: 10 OPTIONS
Call-ID: 19-6371B550-693A4385000CC3AD-18AFA6C0
Max-Forwards: 69
User-Agent: DIDWW Y SBC node
Contact: <sip:46.19.214.55:5060;transport=udp>
Content-Length: 0


<--- Transmitting SIP response (951 bytes) to UDP:46.19.214.54:5060 --->
SIP/2.0 404 Not Found
Via: SIP/2.0/UDP 46.19.214.54;rport=5060;received=46.19.214.54;branch=z9hG4bK8b22.518fa17f2a843eebbbffbcb023c184c3.0
Via: SIP/2.0/UDP 46.19.214.55;rport=5060;received=46.19.214.55;branch=z9hG4bKZbJLJaEx
Call-ID: 19-6371B550-693A4385000CC3AD-18AFA6C0
From: <sip:s@31.97.210.100>;tag=sip_registrar
To: <sip:s@31.97.210.100>;tag=z9hG4bK8b22.518fa17f2a843eebbbffbcb023c184c3.0
CSeq: 10 OPTIONS
Accept: application/xpidf+xml, application/cpim-pidf+xml, application/dialog-info+xml, application/simple-message-summary, application/pidf+xml, application/pidf+xml, application/dialog-info+xml, application/simple-message-summary, application/sdp, message/sipfrag;version=2.0
Allow: OPTIONS, REGISTER, SUBSCRIBE, NOTIFY, PUBLISH, INVITE, ACK, BYE, CANCEL, UPDATE, PRACK, INFO, MESSAGE, REFER
Supported: 100rel, timer, replaces, norefersub
Accept-Encoding: identity
Accept-Language: en
Server: omnileads
Content-Length:  0


<--- Transmitting SIP request (429 bytes) to UDP:190.92.90.136:5060 --->
OPTIONS sip:xpb.cablecolor.hn:5060 SIP/2.0
Via: SIP/2.0/UDP 31.97.210.100:5060;rport;branch=z9hG4bKPj559fac44-65e8-4a20-b346-4bd1fd34f8b9
From: <sip:50642052929@xpb.cablecolor.hn>;tag=f9f9c448-9ee7-4d19-a2b5-431ab299e110
To: <sip:xpb.cablecolor.hn>
Contact: <sip:omnileads@31.97.210.100:5060>
Call-ID: 87895787-c63c-4383-9e18-756e2be5bb4d
CSeq: 26593 OPTIONS
Max-Forwards: 20
User-Agent: omnileads
Content-Length:  0


<--- Received SIP response (386 bytes) from UDP:190.92.90.136:5060 --->
SIP/2.0 404 Not Found
From: <sip:50642052929@xpb.cablecolor.hn>;tag=f9f9c448-9ee7-4d19-a2b5-431ab299e110
To: <sip:xpb.cablecolor.hn>;tag=63f20000-6aed3f52-423da2-7fdf382c1998-100007f-13c4-7217
Call-ID: 87895787-c63c-4383-9e18-756e2be5bb4d
CSeq: 26593 OPTIONS
Via: SIP/2.0/UDP 31.97.210.100:5060;rport=5060;branch=z9hG4bKPj559fac44-65e8-4a20-b346-4bd1fd34f8b9
Content-Length: 0


<--- Transmitting SIP request (422 bytes) to UDP:46.19.212.54:5060 --->
OPTIONS sip:lac.us.out.didww.com SIP/2.0
Via: SIP/2.0/UDP 31.97.210.100:5060;rport;branch=z9hG4bKPj659e31e6-e6d5-4d85-9f5e-eec91108159a
From: <sip:didwwout@31.97.210.100>;tag=b1ef9c01-7953-4c54-975c-a12feec52cc4
To: <sip:lac.us.out.didww.com>
Contact: <sip:didwwout@31.97.210.100:5060>
Call-ID: f7270809-beb3-4316-abd1-f084878a7f76
CSeq: 22163 OPTIONS
Max-Forwards: 20
User-Agent: omnileads
Content-Length:  0


<--- Transmitting SIP request (421 bytes) to UDP:46.19.210.19:5060 --->
OPTIONS sip:fra.eu.out.didww.com SIP/2.0
Via: SIP/2.0/UDP 31.97.210.100:5060;rport;branch=z9hG4bKPj08af010f-4345-4ada-bd90-cda80ea1646b
From: <sip:didwwout@31.97.210.100>;tag=74bca0aa-db07-41a2-bb38-4158dd716a58
To: <sip:fra.eu.out.didww.com>
Contact: <sip:didwwout@31.97.210.100:5060>
Call-ID: 2826e51c-30e0-4e7d-81a8-7f8d99616a44
CSeq: 2717 OPTIONS
Max-Forwards: 20
User-Agent: omnileads
Content-Length:  0


<--- Transmitting SIP request (414 bytes) to UDP:46.19.214.54:5060 --->
OPTIONS sip:sg.out.didww.com SIP/2.0
Via: SIP/2.0/UDP 31.97.210.100:5060;rport;branch=z9hG4bKPj7a451cd7-1a34-48de-bb95-3a6d517f5477
From: <sip:didwwout@31.97.210.100>;tag=2ee3d1f9-e680-495c-ad27-20d968e5e571
To: <sip:sg.out.didww.com>
Contact: <sip:didwwout@31.97.210.100:5060>
Call-ID: d9b8c57c-8a5a-4705-9879-e1cab6a4819c
CSeq: 58667 OPTIONS
Max-Forwards: 20
User-Agent: omnileads
Content-Length:  0


<--- Transmitting SIP request (422 bytes) to UDP:185.238.173.44:5060 --->
OPTIONS sip:ams.eu.out.didww.com SIP/2.0
Via: SIP/2.0/UDP 31.97.210.100:5060;rport;branch=z9hG4bKPj77efd88a-c9f5-4af6-b437-10f0edc6abf3
From: <sip:didwwout@31.97.210.100>;tag=abd530bf-7bc0-4598-acb0-7e761007037f
To: <sip:ams.eu.out.didww.com>
Contact: <sip:didwwout@31.97.210.100:5060>
Call-ID: f5e3bd24-fe49-4e3d-b73e-09d4a19701a1
CSeq: 19827 OPTIONS
Max-Forwards: 20
User-Agent: omnileads
Content-Length:  0


<--- Transmitting SIP request (422 bytes) to UDP:46.19.213.54:5060 --->
OPTIONS sip:mia.us.out.didww.com SIP/2.0
Via: SIP/2.0/UDP 31.97.210.100:5060;rport;branch=z9hG4bKPj15cfb4cc-c99c-4168-9510-ecebcf59c9ff
From: <sip:didwwout@31.97.210.100>;tag=27ba1a2e-f034-4f6d-975e-a461db015e65
To: <sip:mia.us.out.didww.com>
Contact: <sip:didwwout@31.97.210.100:5060>
Call-ID: 33c1d333-05b6-41ab-801e-045dbe5d1966
CSeq: 29109 OPTIONS
Max-Forwards: 20
User-Agent: omnileads
Content-Length:  0


<--- Transmitting SIP request (422 bytes) to UDP:46.19.209.44:5060 --->
OPTIONS sip:nyc.us.out.didww.com SIP/2.0
Via: SIP/2.0/UDP 31.97.210.100:5060;rport;branch=z9hG4bKPj03bf686e-c7f5-4228-9676-9e1141ddc38b
From: <sip:didwwout@31.97.210.100>;tag=5f82aca7-4fb9-41de-b841-f9597943c640
To: <sip:nyc.us.out.didww.com>
Contact: <sip:didwwout@31.97.210.100:5060>
Call-ID: 8e98714f-5858-49a1-8358-286bbb62df8e
CSeq: 63160 OPTIONS
Max-Forwards: 20
User-Agent: omnileads
Content-Length:  0


<--- Received SIP response (410 bytes) from UDP:46.19.212.54:5060 --->
SIP/2.0 200 OK
Via: SIP/2.0/UDP 31.97.210.100:5060;rport=5060;branch=z9hG4bKPj659e31e6-e6d5-4d85-9f5e-eec91108159a;received=31.97.210.100
From: <sip:didwwout@31.97.210.100>;tag=b1ef9c01-7953-4c54-975c-a12feec52cc4
To: <sip:lac.us.out.didww.com>;tag=61925c026ca74f1a129239e9050e36be.8df4fa2c
Call-ID: f7270809-beb3-4316-abd1-f084878a7f76
CSeq: 22163 OPTIONS
Server: Y balancing node
Content-Length: 0


<--- Received SIP response (410 bytes) from UDP:46.19.213.54:5060 --->
SIP/2.0 200 OK
Via: SIP/2.0/UDP 31.97.210.100:5060;rport=5060;branch=z9hG4bKPj15cfb4cc-c99c-4168-9510-ecebcf59c9ff;received=31.97.210.100
From: <sip:didwwout@31.97.210.100>;tag=27ba1a2e-f034-4f6d-975e-a461db015e65
To: <sip:mia.us.out.didww.com>;tag=9ff0357ea6c2a17cdf76a4da6b05bb83.61b44659
Call-ID: 33c1d333-05b6-41ab-801e-045dbe5d1966
CSeq: 29109 OPTIONS
Server: Y balancing node
Content-Length: 0


<--- Received SIP response (410 bytes) from UDP:46.19.209.44:5060 --->
SIP/2.0 200 OK
Via: SIP/2.0/UDP 31.97.210.100:5060;rport=5060;branch=z9hG4bKPj03bf686e-c7f5-4228-9676-9e1141ddc38b;received=31.97.210.100
From: <sip:didwwout@31.97.210.100>;tag=5f82aca7-4fb9-41de-b841-f9597943c640
To: <sip:nyc.us.out.didww.com>;tag=54f5d7e3596166f6d64f70d164c45f5b.8963894d
Call-ID: 8e98714f-5858-49a1-8358-286bbb62df8e
CSeq: 63160 OPTIONS
Server: Y balancing node
Content-Length: 0


<--- Received SIP response (410 bytes) from UDP:185.238.173.44:5060 --->
SIP/2.0 200 OK
Via: SIP/2.0/UDP 31.97.210.100:5060;rport=5060;branch=z9hG4bKPj77efd88a-c9f5-4af6-b437-10f0edc6abf3;received=31.97.210.100
From: <sip:didwwout@31.97.210.100>;tag=abd530bf-7bc0-4598-acb0-7e761007037f
To: <sip:ams.eu.out.didww.com>;tag=f57f85949040ae77bb81993d3df59ad6.9f2bda79
Call-ID: f5e3bd24-fe49-4e3d-b73e-09d4a19701a1
CSeq: 19827 OPTIONS
Server: Y balancing node
Content-Length: 0


<--- Received SIP response (409 bytes) from UDP:46.19.210.19:5060 --->
SIP/2.0 200 OK
Via: SIP/2.0/UDP 31.97.210.100:5060;rport=5060;branch=z9hG4bKPj08af010f-4345-4ada-bd90-cda80ea1646b;received=31.97.210.100
From: <sip:didwwout@31.97.210.100>;tag=74bca0aa-db07-41a2-bb38-4158dd716a58
To: <sip:fra.eu.out.didww.com>;tag=d36836d49580e308ee3d7ca9559ff322.ec178ec7
Call-ID: 2826e51c-30e0-4e7d-81a8-7f8d99616a44
CSeq: 2717 OPTIONS
Server: Y balancing node
Content-Length: 0


<--- Received SIP response (406 bytes) from UDP:46.19.214.54:5060 --->
SIP/2.0 200 OK
Via: SIP/2.0/UDP 31.97.210.100:5060;rport=5060;branch=z9hG4bKPj7a451cd7-1a34-48de-bb95-3a6d517f5477;received=31.97.210.100
From: <sip:didwwout@31.97.210.100>;tag=2ee3d1f9-e680-495c-ad27-20d968e5e571
To: <sip:sg.out.didww.com>;tag=4994c42b455d25638b884b484c011b88.4fbfee08
Call-ID: d9b8c57c-8a5a-4705-9879-e1cab6a4819c
CSeq: 58667 OPTIONS
Server: Y balancing node
Content-Length: 0


<--- Transmitting SIP request (429 bytes) to UDP:192.76.120.10:5060 --->
OPTIONS sip:sip.telnyx.com:5060 SIP/2.0
Via: SIP/2.0/UDP 31.97.210.100:5060;rport;branch=z9hG4bKPj042103a4-c35b-4afb-a91d-662fa85fa056
From: <sip:telnyx_local_in@31.97.210.100>;tag=187dd220-99ff-4ca4-b193-307a46ea1d72
To: <sip:sip.telnyx.com>
Contact: <sip:telnyx_local_in@31.97.210.100:5060>
Call-ID: 0289a634-6113-40ea-ba12-1e64e9631764
CSeq: 47719 OPTIONS
Max-Forwards: 20
User-Agent: omnileads
Content-Length:  0


<--- Received SIP response (422 bytes) from UDP:192.76.120.10:5060 --->
SIP/2.0 200 Keepalive P20
Via: SIP/2.0/UDP 31.97.210.100:5060;rport=5060;received=31.97.210.100;branch=z9hG4bKPj042103a4-c35b-4afb-a91d-662fa85fa056
From: <sip:telnyx_local_in@31.97.210.100>;tag=187dd220-99ff-4ca4-b193-307a46ea1d72
To: <sip:sip.telnyx.com>;tag=dfb4940bfc7117e4d7fa62ed6ef36d37.e10d99bd
Call-ID: 0289a634-6113-40ea-ba12-1e64e9631764
CSeq: 47719 OPTIONS
Server: Telnyx SIP Proxy
Content-Length: 0


<--- Received SIP request (349 bytes) from UDP:51.161.137.193:58502 --->
REGISTER sip:31.97.210.100 SIP/2.0
Via: SIP/2.0/UDP 51.161.137.193:58502;branch=z9hG4bK1203135818
Max-Forwards: 70
From: <sip:3498@31.97.210.100>;tag=958666277
To: <sip:3498@31.97.210.100>
Call-ID: 1066330060-945798139-72591940
CSeq: 1 REGISTER
Contact: <sip:3498@51.161.137.193:58502>
Content-Length: 0
User-Agent: Avaya IP Phone 1120E


[Dec 10 22:07:39] NOTICE[343]: res_pjsip/pjsip_distributor.c:688 log_failed_request: Request 'REGISTER' from '<sip:3498@31.97.210.100>' failed for '51.161.137.193:58502' (callid: 1066330060-945798139-72591940) - No matching endpoint found
[Dec 10 22:07:39] SECURITY[73]: res_security_log.c:114 security_event_stasis_cb: SecurityEvent="InvalidAccountID",EventTV="2025-12-10T22:07:39.971-0600",Severity="Error",Service="PJSIP",EventVersion="1",AccountID="3498",SessionID="1066330060-945798139-72591940",LocalAddress="IPV4/UDP/31.97.210.100/5060",RemoteAddress="IPV4/UDP/51.161.137.193/58502"
[Dec 10 22:07:39] SECURITY[73]: res_security_log.c:114 security_event_stasis_cb: SecurityEvent="ChallengeSent",EventTV="2025-12-10T22:07:39.971-0600",Severity="Informational",Service="PJSIP",EventVersion="1",AccountID="<unknown>",SessionID="1066330060-945798139-72591940",LocalAddress="IPV4/UDP/31.97.210.100/5060",RemoteAddress="IPV4/UDP/51.161.137.193/58502",Challenge=""
<--- Transmitting SIP response (469 bytes) to UDP:51.161.137.193:58502 --->
SIP/2.0 401 Unauthorized
Via: SIP/2.0/UDP 51.161.137.193:58502;rport=58502;received=51.161.137.193;branch=z9hG4bK1203135818
Call-ID: 1066330060-945798139-72591940
From: <sip:3498@31.97.210.100>;tag=958666277
To: <sip:3498@31.97.210.100>;tag=z9hG4bK1203135818
CSeq: 1 REGISTER
WWW-Authenticate: Digest realm="asterisk",nonce="1765426059/0ac8c076b73f6fc315a5e584a33137b4",opaque="6857be8d72838bbf",algorithm=MD5,qop="auth"
Server: omnileads
Content-Length:  0


<--- Received SIP request (607 bytes) from UDP:51.161.137.193:58502 --->
REGISTER sip:31.97.210.100 SIP/2.0
Via: SIP/2.0/UDP 51.161.137.193:58502;branch=z9hG4bK1785214829
Max-Forwards: 70
From: <sip:3498@31.97.210.100>;tag=958666277
To: <sip:3498@31.97.210.100>
Call-ID: 1066330060-945798139-72591940
CSeq: 2 REGISTER
Contact: <sip:3498@51.161.137.193:58502>
Content-Length: 0
Authorization: Digest username="3498",uri="sip:31.97.210.100",algorithm=MD5,realm="asterisk",nonce="1765426059/0ac8c076b73f6fc315a5e584a33137b4",response="9bad464899761877e701121bce652675",qop=auth,nc=00000001, cnonce="1474417116",opaque="6857be8d72838bbf"
User-Agent: Avaya IP Phone 1120E


[Dec 10 22:07:40] NOTICE[897]: res_pjsip/pjsip_distributor.c:688 log_failed_request: Request 'REGISTER' from '<sip:3498@31.97.210.100>' failed for '51.161.137.193:58502' (callid: 1066330060-945798139-72591940) - No matching endpoint found
[Dec 10 22:07:40] SECURITY[73]: res_security_log.c:114 security_event_stasis_cb: SecurityEvent="InvalidAccountID",EventTV="2025-12-10T22:07:40.181-0600",Severity="Error",Service="PJSIP",EventVersion="1",AccountID="3498",SessionID="1066330060-945798139-72591940",LocalAddress="IPV4/UDP/31.97.210.100/5060",RemoteAddress="IPV4/UDP/51.161.137.193/58502"
[Dec 10 22:07:40] NOTICE[897]: res_pjsip/pjsip_distributor.c:688 log_failed_request: Request 'REGISTER' from '<sip:3498@31.97.210.100>' failed for '51.161.137.193:58502' (callid: 1066330060-945798139-72591940) - Failed to authenticate
[Dec 10 22:07:40] SECURITY[73]: res_security_log.c:114 security_event_stasis_cb: SecurityEvent="ChallengeResponseFailed",EventTV="2025-12-10T22:07:40.182-0600",Severity="Error",Service="PJSIP",EventVersion="1",AccountID="<unknown>",SessionID="1066330060-945798139-72591940",LocalAddress="IPV4/UDP/31.97.210.100/5060",RemoteAddress="IPV4/UDP/51.161.137.193/58502",Challenge="1765426059/0ac8c076b73f6fc315a5e584a33137b4",Response="9bad464899761877e701121bce652675",ExpectedResponse=""
<--- Transmitting SIP response (469 bytes) to UDP:51.161.137.193:58502 --->
SIP/2.0 401 Unauthorized
Via: SIP/2.0/UDP 51.161.137.193:58502;rport=58502;received=51.161.137.193;branch=z9hG4bK1785214829
Call-ID: 1066330060-945798139-72591940
From: <sip:3498@31.97.210.100>;tag=958666277
To: <sip:3498@31.97.210.100>;tag=z9hG4bK1785214829
CSeq: 2 REGISTER
WWW-Authenticate: Digest realm="asterisk",nonce="1765426060/cab8aadd7093487e42dc430893dacb27",opaque="15b16e3a7788ab09",algorithm=MD5,qop="auth"
Server: omnileads
Content-Length:  0


<--- Received SIP request (607 bytes) from UDP:51.161.137.193:58502 --->
REGISTER sip:31.97.210.100 SIP/2.0
Via: SIP/2.0/UDP 51.161.137.193:58502;branch=z9hG4bK2107265201
Max-Forwards: 70
From: <sip:3498@31.97.210.100>;tag=958666277
To: <sip:3498@31.97.210.100>
Call-ID: 1066330060-945798139-72591940
CSeq: 3 REGISTER
Contact: <sip:3498@51.161.137.193:58502>
Content-Length: 0
Authorization: Digest username="3498",uri="sip:31.97.210.100",algorithm=MD5,realm="asterisk",nonce="1765426060/cab8aadd7093487e42dc430893dacb27",response="a16554c8f07f2b163d55827e41f64fb4",qop=auth,nc=00000001, cnonce="1217290076",opaque="15b16e3a7788ab09"
User-Agent: Avaya IP Phone 1120E


[Dec 10 22:07:40] NOTICE[5876]: res_pjsip/pjsip_distributor.c:688 log_failed_request: Request 'REGISTER' from '<sip:3498@31.97.210.100>' failed for '51.161.137.193:58502' (callid: 1066330060-945798139-72591940) - No matching endpoint found
[Dec 10 22:07:40] NOTICE[5876]: res_pjsip/pjsip_distributor.c:688 log_failed_request: Request 'REGISTER' from '<sip:3498@31.97.210.100>' failed for '51.161.137.193:58502' (callid: 1066330060-945798139-72591940) - Failed to authenticate
[Dec 10 22:07:40] SECURITY[73]: res_security_log.c:114 security_event_stasis_cb: SecurityEvent="InvalidAccountID",EventTV="2025-12-10T22:07:40.394-0600",Severity="Error",Service="PJSIP",EventVersion="1",AccountID="3498",SessionID="1066330060-945798139-72591940",LocalAddress="IPV4/UDP/31.97.210.100/5060",RemoteAddress="IPV4/UDP/51.161.137.193/58502"
[Dec 10 22:07:40] SECURITY[73]: res_security_log.c:114 security_event_stasis_cb: SecurityEvent="ChallengeResponseFailed",EventTV="2025-12-10T22:07:40.394-0600",Severity="Error",Service="PJSIP",EventVersion="1",AccountID="<unknown>",SessionID="1066330060-945798139-72591940",LocalAddress="IPV4/UDP/31.97.210.100/5060",RemoteAddress="IPV4/UDP/51.161.137.193/58502",Challenge="1765426060/cab8aadd7093487e42dc430893dacb27",Response="a16554c8f07f2b163d55827e41f64fb4",ExpectedResponse=""
<--- Transmitting SIP response (469 bytes) to UDP:51.161.137.193:58502 --->
SIP/2.0 401 Unauthorized
Via: SIP/2.0/UDP 51.161.137.193:58502;rport=58502;received=51.161.137.193;branch=z9hG4bK2107265201
Call-ID: 1066330060-945798139-72591940
From: <sip:3498@31.97.210.100>;tag=958666277
To: <sip:3498@31.97.210.100>;tag=z9hG4bK2107265201
CSeq: 3 REGISTER
WWW-Authenticate: Digest realm="asterisk",nonce="1765426060/cab8aadd7093487e42dc430893dacb27",opaque="07c8c42e0055a7bb",algorithm=MD5,qop="auth"
Server: omnileads
Content-Length:  0


<--- Received SIP request (606 bytes) from UDP:51.161.137.193:58502 --->
REGISTER sip:31.97.210.100 SIP/2.0
Via: SIP/2.0/UDP 51.161.137.193:58502;branch=z9hG4bK2018002382
Max-Forwards: 70
From: <sip:3498@31.97.210.100>;tag=958666277
To: <sip:3498@31.97.210.100>
Call-ID: 1066330060-945798139-72591940
CSeq: 4 REGISTER
Contact: <sip:3498@51.161.137.193:58502>
Content-Length: 0
Authorization: Digest username="3498",uri="sip:31.97.210.100",algorithm=MD5,realm="asterisk",nonce="1765426060/cab8aadd7093487e42dc430893dacb27",response="7cc774987bab0b004941d7cc3a2015f4",qop=auth,nc=00000001, cnonce="227500423",opaque="07c8c42e0055a7bb"
User-Agent: Avaya IP Phone 1120E


[Dec 10 22:07:40] NOTICE[343]: res_pjsip/pjsip_distributor.c:688 log_failed_request: Request 'REGISTER' from '<sip:3498@31.97.210.100>' failed for '51.161.137.193:58502' (callid: 1066330060-945798139-72591940) - No matching endpoint found
[Dec 10 22:07:40] NOTICE[343]: res_pjsip/pjsip_distributor.c:688 log_failed_request: Request 'REGISTER' from '<sip:3498@31.97.210.100>' failed for '51.161.137.193:58502' (callid: 1066330060-945798139-72591940) - Failed to authenticate
[Dec 10 22:07:40] SECURITY[73]: res_security_log.c:114 security_event_stasis_cb: SecurityEvent="InvalidAccountID",EventTV="2025-12-10T22:07:40.605-0600",Severity="Error",Service="PJSIP",EventVersion="1",AccountID="3498",SessionID="1066330060-945798139-72591940",LocalAddress="IPV4/UDP/31.97.210.100/5060",RemoteAddress="IPV4/UDP/51.161.137.193/58502"
[Dec 10 22:07:40] SECURITY[73]: res_security_log.c:114 security_event_stasis_cb: SecurityEvent="ChallengeResponseFailed",EventTV="2025-12-10T22:07:40.605-0600",Severity="Error",Service="PJSIP",EventVersion="1",AccountID="<unknown>",SessionID="1066330060-945798139-72591940",LocalAddress="IPV4/UDP/31.97.210.100/5060",RemoteAddress="IPV4/UDP/51.161.137.193/58502",Challenge="1765426060/cab8aadd7093487e42dc430893dacb27",Response="7cc774987bab0b004941d7cc3a2015f4",ExpectedResponse=""
<--- Transmitting SIP response (469 bytes) to UDP:51.161.137.193:58502 --->
SIP/2.0 401 Unauthorized
Via: SIP/2.0/UDP 51.161.137.193:58502;rport=58502;received=51.161.137.193;branch=z9hG4bK2018002382
Call-ID: 1066330060-945798139-72591940
From: <sip:3498@31.97.210.100>;tag=958666277
To: <sip:3498@31.97.210.100>;tag=z9hG4bK2018002382
CSeq: 4 REGISTER
WWW-Authenticate: Digest realm="asterisk",nonce="1765426060/cab8aadd7093487e42dc430893dacb27",opaque="7b0464776b2f1a4f",algorithm=MD5,qop="auth"
Server: omnileads
Content-Length:  0


<--- Received SIP request (606 bytes) from UDP:51.161.137.193:58502 --->
REGISTER sip:31.97.210.100 SIP/2.0
Via: SIP/2.0/UDP 51.161.137.193:58502;branch=z9hG4bK2029915112
Max-Forwards: 70
From: <sip:3498@31.97.210.100>;tag=958666277
To: <sip:3498@31.97.210.100>
Call-ID: 1066330060-945798139-72591940
CSeq: 5 REGISTER
Contact: <sip:3498@51.161.137.193:58502>
Content-Length: 0
Authorization: Digest username="3498",uri="sip:31.97.210.100",algorithm=MD5,realm="asterisk",nonce="1765426060/cab8aadd7093487e42dc430893dacb27",response="5d154940cb75d2ae7659a9958413ac30",qop=auth,nc=00000001, cnonce="461544788",opaque="7b0464776b2f1a4f"
User-Agent: Avaya IP Phone 1120E


[Dec 10 22:07:40] NOTICE[897]: res_pjsip/pjsip_distributor.c:688 log_failed_request: Request 'REGISTER' from '<sip:3498@31.97.210.100>' failed for '51.161.137.193:58502' (callid: 1066330060-945798139-72591940) - No matching endpoint found
[Dec 10 22:07:40] NOTICE[897]: res_pjsip/pjsip_distributor.c:688 log_failed_request: Request 'REGISTER' from '<sip:3498@31.97.210.100>' failed for '51.161.137.193:58502' (callid: 1066330060-945798139-72591940) - Failed to authenticate
[Dec 10 22:07:40] SECURITY[73]: res_security_log.c:114 security_event_stasis_cb: SecurityEvent="InvalidAccountID",EventTV="2025-12-10T22:07:40.832-0600",Severity="Error",Service="PJSIP",EventVersion="1",AccountID="3498",SessionID="1066330060-945798139-72591940",LocalAddress="IPV4/UDP/31.97.210.100/5060",RemoteAddress="IPV4/UDP/51.161.137.193/58502"
[Dec 10 22:07:40] SECURITY[73]: res_security_log.c:114 security_event_stasis_cb: SecurityEvent="ChallengeResponseFailed",EventTV="2025-12-10T22:07:40.832-0600",Severity="Error",Service="PJSIP",EventVersion="1",AccountID="<unknown>",SessionID="1066330060-945798139-72591940",LocalAddress="IPV4/UDP/31.97.210.100/5060",RemoteAddress="IPV4/UDP/51.161.137.193/58502",Challenge="1765426060/cab8aadd7093487e42dc430893dacb27",Response="5d154940cb75d2ae7659a9958413ac30",ExpectedResponse=""
<--- Transmitting SIP response (469 bytes) to UDP:51.161.137.193:58502 --->
SIP/2.0 401 Unauthorized
Via: SIP/2.0/UDP 51.161.137.193:58502;rport=58502;received=51.161.137.193;branch=z9hG4bK2029915112
Call-ID: 1066330060-945798139-72591940
From: <sip:3498@31.97.210.100>;tag=958666277
To: <sip:3498@31.97.210.100>;tag=z9hG4bK2029915112
CSeq: 5 REGISTER
WWW-Authenticate: Digest realm="asterisk",nonce="1765426060/cab8aadd7093487e42dc430893dacb27",opaque="481ccede5fa93fdd",algorithm=MD5,qop="auth"
Server: omnileads
Content-Length:  0


<--- Received SIP request (605 bytes) from UDP:51.161.137.193:58502 --->
REGISTER sip:31.97.210.100 SIP/2.0
Via: SIP/2.0/UDP 51.161.137.193:58502;branch=z9hG4bK35969118
Max-Forwards: 70
From: <sip:3498@31.97.210.100>;tag=958666277
To: <sip:3498@31.97.210.100>
Call-ID: 1066330060-945798139-72591940
CSeq: 6 REGISTER
Contact: <sip:3498@51.161.137.193:58502>
Content-Length: 0
Authorization: Digest username="3498",uri="sip:31.97.210.100",algorithm=MD5,realm="asterisk",nonce="1765426060/cab8aadd7093487e42dc430893dacb27",response="9a1771edd7b03a019f6264dc2a80e9e3",qop=auth,nc=00000001, cnonce="1789906632",opaque="481ccede5fa93fdd"
User-Agent: Avaya IP Phone 1120E


[Dec 10 22:07:41] NOTICE[5876]: res_pjsip/pjsip_distributor.c:688 log_failed_request: Request 'REGISTER' from '<sip:3498@31.97.210.100>' failed for '51.161.137.193:58502' (callid: 1066330060-945798139-72591940) - No matching endpoint found
[Dec 10 22:07:41] SECURITY[73]: res_security_log.c:114 security_event_stasis_cb: SecurityEvent="InvalidAccountID",EventTV="2025-12-10T22:07:41.056-0600",Severity="Error",Service="PJSIP",EventVersion="1",AccountID="3498",SessionID="1066330060-945798139-72591940",LocalAddress="IPV4/UDP/31.97.210.100/5060",RemoteAddress="IPV4/UDP/51.161.137.193/58502"
[Dec 10 22:07:41] NOTICE[5876]: res_pjsip/pjsip_distributor.c:688 log_failed_request: Request 'REGISTER' from '<sip:3498@31.97.210.100>' failed for '51.161.137.193:58502' (callid: 1066330060-945798139-72591940) - Failed to authenticate
[Dec 10 22:07:41] SECURITY[73]: res_security_log.c:114 security_event_stasis_cb: SecurityEvent="ChallengeResponseFailed",EventTV="2025-12-10T22:07:41.057-0600",Severity="Error",Service="PJSIP",EventVersion="1",AccountID="<unknown>",SessionID="1066330060-945798139-72591940",LocalAddress="IPV4/UDP/31.97.210.100/5060",RemoteAddress="IPV4/UDP/51.161.137.193/58502",Challenge="1765426060/cab8aadd7093487e42dc430893dacb27",Response="9a1771edd7b03a019f6264dc2a80e9e3",ExpectedResponse=""
<--- Transmitting SIP response (465 bytes) to UDP:51.161.137.193:58502 --->
SIP/2.0 401 Unauthorized
Via: SIP/2.0/UDP 51.161.137.193:58502;rport=58502;received=51.161.137.193;branch=z9hG4bK35969118
Call-ID: 1066330060-945798139-72591940
From: <sip:3498@31.97.210.100>;tag=958666277
To: <sip:3498@31.97.210.100>;tag=z9hG4bK35969118
CSeq: 6 REGISTER
WWW-Authenticate: Digest realm="asterisk",nonce="1765426061/e35cf61490ace13133db610eae52944b",opaque="698c6427771b26fc",algorithm=MD5,qop="auth"
Server: omnileads
Content-Length:  0


<--- Received SIP request (477 bytes) from UDP:46.19.213.54:5060 --->
OPTIONS sip:s@31.97.210.100:5060 SIP/2.0
Via: SIP/2.0/UDP 46.19.213.54;branch=z9hG4bK73df.f17b8528ee41dd7d9de397824d5392ee.0
Via: SIP/2.0/UDP 46.19.213.56;received=46.19.213.56;branch=z9hG4bKDqMDda.W;rport=5060
From: sip:s@31.97.210.100:5060;tag=sip_registrar
To: sip:s@31.97.210.100:5060
CSeq: 10 OPTIONS
Call-ID: 18-4AAA68EA-693A438D0006F935-A47FB6C0
Max-Forwards: 69
User-Agent: DIDWW Y SBC node
Contact: <sip:46.19.213.56:5060;transport=udp>
Content-Length: 0


<--- Transmitting SIP response (951 bytes) to UDP:46.19.213.54:5060 --->
SIP/2.0 404 Not Found
Via: SIP/2.0/UDP 46.19.213.54;rport=5060;received=46.19.213.54;branch=z9hG4bK73df.f17b8528ee41dd7d9de397824d5392ee.0
Via: SIP/2.0/UDP 46.19.213.56;rport=5060;received=46.19.213.56;branch=z9hG4bKDqMDda.W
Call-ID: 18-4AAA68EA-693A438D0006F935-A47FB6C0
From: <sip:s@31.97.210.100>;tag=sip_registrar
To: <sip:s@31.97.210.100>;tag=z9hG4bK73df.f17b8528ee41dd7d9de397824d5392ee.0
CSeq: 10 OPTIONS
Accept: application/xpidf+xml, application/cpim-pidf+xml, application/dialog-info+xml, application/simple-message-summary, application/pidf+xml, application/pidf+xml, application/dialog-info+xml, application/simple-message-summary, application/sdp, message/sipfrag;version=2.0
Allow: OPTIONS, REGISTER, SUBSCRIBE, NOTIFY, PUBLISH, INVITE, ACK, BYE, CANCEL, UPDATE, PRACK, INFO, MESSAGE, REFER
Supported: 100rel, timer, replaces, norefersub
Accept-Encoding: identity
Accept-Language: en
Server: omnileads
Content-Length:  0


<--- Received SIP request (407 bytes) from UDP:127.0.0.1:10061 --->
OPTIONS sip:127.0.0.1:5260 SIP/2.0
Via: SIP/2.0/UDP 127.0.0.1:10061;rport;branch=z9hG4bKPjbad33df0-aee3-48b4-8d96-aae06d5a66bd
From: <sip:pstn_gateway@31.97.210.100>;tag=5e9630bf-f2d2-46f0-878b-2b0cfbf4665e
To: <sip:127.0.0.1>
Contact: <sip:pstn_gateway@127.0.0.1:10061>
Call-ID: ba444f36-000a-4fc5-aa62-9c0f334e2946
CSeq: 3075 OPTIONS
Max-Forwards: 20
User-Agent: omnidialer
Content-Length:  0


<--- Transmitting SIP response (885 bytes) to UDP:127.0.0.1:10061 --->
SIP/2.0 200 OK
Via: SIP/2.0/UDP 127.0.0.1:10061;rport=10061;received=127.0.0.1;branch=z9hG4bKPjbad33df0-aee3-48b4-8d96-aae06d5a66bd
Call-ID: ba444f36-000a-4fc5-aa62-9c0f334e2946
From: <sip:pstn_gateway@31.97.210.100>;tag=5e9630bf-f2d2-46f0-878b-2b0cfbf4665e
To: <sip:127.0.0.1>;tag=z9hG4bKPjbad33df0-aee3-48b4-8d96-aae06d5a66bd
CSeq: 3075 OPTIONS
Accept: application/xpidf+xml, application/cpim-pidf+xml, application/dialog-info+xml, application/simple-message-summary, application/pidf+xml, application/pidf+xml, application/dialog-info+xml, application/simple-message-summary, application/sdp, message/sipfrag;version=2.0
Allow: OPTIONS, REGISTER, SUBSCRIBE, NOTIFY, PUBLISH, INVITE, ACK, BYE, CANCEL, UPDATE, PRACK, INFO, MESSAGE, REFER
Supported: 100rel, timer, replaces, norefersub
Accept-Encoding: identity
Accept-Language: en
Server: omnileads
Content-Length:  0


<--- Received SIP request (396 bytes) from UDP:127.0.0.1:10061 --->
OPTIONS sip:127.0.0.1:5260 SIP/2.0
Via: SIP/2.0/UDP 127.0.0.1:10061;rport;branch=z9hG4bKPj9f8cc493-20da-49a6-84a5-f7b697a077d2
From: <sip:omlacd@31.97.210.100>;tag=2cbbebdc-28b7-4751-aa51-9b6ab4247c2c
To: <sip:127.0.0.1>
Contact: <sip:omlacd@127.0.0.1:10061>
Call-ID: 99f10524-1b6f-4cc4-bff9-75863750da89
CSeq: 22355 OPTIONS
Max-Forwards: 20
User-Agent: omnidialer
Content-Length:  0


<--- Transmitting SIP response (880 bytes) to UDP:127.0.0.1:10061 --->
SIP/2.0 200 OK
Via: SIP/2.0/UDP 127.0.0.1:10061;rport=10061;received=127.0.0.1;branch=z9hG4bKPj9f8cc493-20da-49a6-84a5-f7b697a077d2
Call-ID: 99f10524-1b6f-4cc4-bff9-75863750da89
From: <sip:omlacd@31.97.210.100>;tag=2cbbebdc-28b7-4751-aa51-9b6ab4247c2c
To: <sip:127.0.0.1>;tag=z9hG4bKPj9f8cc493-20da-49a6-84a5-f7b697a077d2
CSeq: 22355 OPTIONS
Accept: application/xpidf+xml, application/cpim-pidf+xml, application/dialog-info+xml, application/simple-message-summary, application/pidf+xml, application/pidf+xml, application/dialog-info+xml, application/simple-message-summary, application/sdp, message/sipfrag;version=2.0
Allow: OPTIONS, REGISTER, SUBSCRIBE, NOTIFY, PUBLISH, INVITE, ACK, BYE, CANCEL, UPDATE, PRACK, INFO, MESSAGE, REFER
Supported: 100rel, timer, replaces, norefersub
Accept-Encoding: identity
Accept-Language: en
Server: omnileads
Content-Length:  0


<--- Received SIP request (477 bytes) from UDP:46.19.210.19:5060 --->
OPTIONS sip:s@31.97.210.100:5060 SIP/2.0
Via: SIP/2.0/UDP 46.19.210.19;branch=z9hG4bK7e0b.ad643df21931cdf6e89af0dbbeb8cab8.0
Via: SIP/2.0/UDP 46.19.210.21;received=46.19.210.21;branch=z9hG4bK8PX0DarU;rport=5060
From: sip:s@31.97.210.100:5060;tag=sip_registrar
To: sip:s@31.97.210.100:5060
CSeq: 10 OPTIONS
Call-ID: 12-0B8AAFC5-693A439400016D07-891FA6C0
Max-Forwards: 69
User-Agent: DIDWW Y SBC node
Contact: <sip:46.19.210.21:5060;transport=udp>
Content-Length: 0


<--- Transmitting SIP response (951 bytes) to UDP:46.19.210.19:5060 --->
SIP/2.0 404 Not Found
Via: SIP/2.0/UDP 46.19.210.19;rport=5060;received=46.19.210.19;branch=z9hG4bK7e0b.ad643df21931cdf6e89af0dbbeb8cab8.0
Via: SIP/2.0/UDP 46.19.210.21;rport=5060;received=46.19.210.21;branch=z9hG4bK8PX0DarU
Call-ID: 12-0B8AAFC5-693A439400016D07-891FA6C0
From: <sip:s@31.97.210.100>;tag=sip_registrar
To: <sip:s@31.97.210.100>;tag=z9hG4bK7e0b.ad643df21931cdf6e89af0dbbeb8cab8.0
CSeq: 10 OPTIONS
Accept: application/xpidf+xml, application/cpim-pidf+xml, application/dialog-info+xml, application/simple-message-summary, application/pidf+xml, application/pidf+xml, application/dialog-info+xml, application/simple-message-summary, application/sdp, message/sipfrag;version=2.0
Allow: OPTIONS, REGISTER, SUBSCRIBE, NOTIFY, PUBLISH, INVITE, ACK, BYE, CANCEL, UPDATE, PRACK, INFO, MESSAGE, REFER
Supported: 100rel, timer, replaces, norefersub
Accept-Encoding: identity
Accept-Language: en
Server: omnileads
Content-Length:  0


<--- Transmitting SIP request (425 bytes) to UDP:127.0.0.1:10060 --->
OPTIONS sip:1002@127.0.0.1:10060 SIP/2.0
Via: SIP/2.0/UDP 31.97.210.100:5160;rport;branch=z9hG4bKPj8eeeff96-42cb-4b47-8d3e-52ac9431b02c
From: <sip:1002@31.97.210.100>;tag=415ce098-bb2f-4978-9795-63bb564820b2
To: <sip:1002@127.0.0.1>
Contact: <sip:1002@31.97.210.100:5160>
Call-ID: 5e258cf7-92c1-405e-9f2c-8802bf3ea655
CSeq: 15815 OPTIONS
Supported: path
Max-Forwards: 20
User-Agent: omnileads
Content-Length:  0


<--- Received SIP response (477 bytes) from UDP:127.0.0.1:10060 --->
SIP/2.0 200 OK
Via: SIP/2.0/UDP 31.97.210.100:5160;received=31.97.210.100;rport=5160;branch=z9hG4bKPj8eeeff96-42cb-4b47-8d3e-52ac9431b02c
To: <sip:1002@127.0.0.1>;tag=3nbk4197hk
From: <sip:1002@31.97.210.100>;tag=415ce098-bb2f-4978-9795-63bb564820b2
Call-ID: 5e258cf7-92c1-405e-9f2c-8802bf3ea655
CSeq: 15815 OPTIONS
Allow: INVITE,ACK,CANCEL,BYE,UPDATE,MESSAGE,OPTIONS,REFER,INFO
Accept: application/sdp, application/dtmf-relay
Supported: outbound
Content-Length: 0


<--- Received SIP request (477 bytes) from UDP:46.19.212.54:5060 --->
OPTIONS sip:s@31.97.210.100:5060 SIP/2.0
Via: SIP/2.0/UDP 46.19.212.54;branch=z9hG4bKb542.08d2648059569c392b43f33c079b7d8b.0
Via: SIP/2.0/UDP 46.19.212.56;received=46.19.212.56;branch=z9hG4bKflmxsa89;rport=5060
From: sip:s@31.97.210.100:5060;tag=sip_registrar
To: sip:s@31.97.210.100:5060
CSeq: 10 OPTIONS
Call-ID: 16-02462B59-693A439600003EFC-F33FD6C0
Max-Forwards: 69
User-Agent: DIDWW Y SBC node
Contact: <sip:46.19.212.56:5060;transport=udp>
Content-Length: 0


<--- Transmitting SIP response (951 bytes) to UDP:46.19.212.54:5060 --->
SIP/2.0 404 Not Found
Via: SIP/2.0/UDP 46.19.212.54;rport=5060;received=46.19.212.54;branch=z9hG4bKb542.08d2648059569c392b43f33c079b7d8b.0
Via: SIP/2.0/UDP 46.19.212.56;rport=5060;received=46.19.212.56;branch=z9hG4bKflmxsa89
Call-ID: 16-02462B59-693A439600003EFC-F33FD6C0
From: <sip:s@31.97.210.100>;tag=sip_registrar
To: <sip:s@31.97.210.100>;tag=z9hG4bKb542.08d2648059569c392b43f33c079b7d8b.0
CSeq: 10 OPTIONS
Accept: application/xpidf+xml, application/cpim-pidf+xml, application/dialog-info+xml, application/simple-message-summary, application/pidf+xml, application/pidf+xml, application/dialog-info+xml, application/simple-message-summary, application/sdp, message/sipfrag;version=2.0
Allow: OPTIONS, REGISTER, SUBSCRIBE, NOTIFY, PUBLISH, INVITE, ACK, BYE, CANCEL, UPDATE, PRACK, INFO, MESSAGE, REFER
Supported: 100rel, timer, replaces, norefersub
Accept-Encoding: identity
Accept-Language: en
Server: omnileads
Content-Length:  0


<--- Received SIP request (474 bytes) from UDP:46.19.212.54:5060 --->
OPTIONS sip:s@31.97.210.100:5060 SIP/2.0
Via: SIP/2.0/UDP 46.19.212.54;branch=z9hG4bK0.f5bd439feb9fa7b741067893885ba91a.0
Via: SIP/2.0/UDP 46.19.212.55;received=46.19.212.55;branch=z9hG4bKnzIYQakL;rport=5060
From: sip:s@31.97.210.100:5060;tag=sip_registrar
To: sip:s@31.97.210.100:5060
CSeq: 10 OPTIONS
Call-ID: 15-299B145E-693A43960005C4D4-312FB6C0
Max-Forwards: 69
User-Agent: DIDWW Y SBC node
Contact: <sip:46.19.212.55:5060;transport=udp>
Content-Length: 0


<--- Transmitting SIP response (945 bytes) to UDP:46.19.212.54:5060 --->
SIP/2.0 404 Not Found
Via: SIP/2.0/UDP 46.19.212.54;rport=5060;received=46.19.212.54;branch=z9hG4bK0.f5bd439feb9fa7b741067893885ba91a.0
Via: SIP/2.0/UDP 46.19.212.55;rport=5060;received=46.19.212.55;branch=z9hG4bKnzIYQakL
Call-ID: 15-299B145E-693A43960005C4D4-312FB6C0
From: <sip:s@31.97.210.100>;tag=sip_registrar
To: <sip:s@31.97.210.100>;tag=z9hG4bK0.f5bd439feb9fa7b741067893885ba91a.0
CSeq: 10 OPTIONS
Accept: application/xpidf+xml, application/cpim-pidf+xml, application/dialog-info+xml, application/simple-message-summary, application/pidf+xml, application/pidf+xml, application/dialog-info+xml, application/simple-message-summary, application/sdp, message/sipfrag;version=2.0
Allow: OPTIONS, REGISTER, SUBSCRIBE, NOTIFY, PUBLISH, INVITE, ACK, BYE, CANCEL, UPDATE, PRACK, INFO, MESSAGE, REFER
Supported: 100rel, timer, replaces, norefersub
Accept-Encoding: identity
Accept-Language: en
Server: omnileads
Content-Length:  0


<--- Transmitting SIP request (435 bytes) to UDP:192.76.120.10:5060 --->
OPTIONS sip:sip.telnyx.com:5060 SIP/2.0
Via: SIP/2.0/UDP 31.97.210.100:5060;rport;branch=z9hG4bKPjf961f09b-eb59-423d-8e97-0bdf10eab77a
From: <sip:telnyx_tollfree_in@31.97.210.100>;tag=f2884e3b-cb88-4c1a-940b-234d79392f2d
To: <sip:sip.telnyx.com>
Contact: <sip:telnyx_tollfree_in@31.97.210.100:5060>
Call-ID: d75f252a-76a4-4913-b748-d7da647cb39f
CSeq: 37761 OPTIONS
Max-Forwards: 20
User-Agent: omnileads
Content-Length:  0


<--- Received SIP request (485 bytes) from UDP:185.238.173.44:5060 --->
OPTIONS sip:s@31.97.210.100:5060 SIP/2.0
Via: SIP/2.0/UDP 185.238.173.44;branch=z9hG4bK09b8.0f444e31dbd1196924df1b9f199326cc.0
Via: SIP/2.0/UDP 185.238.173.56;received=185.238.173.56;branch=z9hG4bKdTvUwagS;rport=5060
From: sip:s@31.97.210.100:5060;tag=sip_registrar
To: sip:s@31.97.210.100:5060
CSeq: 10 OPTIONS
Call-ID: 24-3991E3D9-693A43970002F86D-02BFE6C0
Max-Forwards: 69
User-Agent: DIDWW Y SBC node
Contact: <sip:185.238.173.56:5060;transport=udp>
Content-Length: 0


<--- Transmitting SIP response (959 bytes) to UDP:185.238.173.44:5060 --->
SIP/2.0 404 Not Found
Via: SIP/2.0/UDP 185.238.173.44;rport=5060;received=185.238.173.44;branch=z9hG4bK09b8.0f444e31dbd1196924df1b9f199326cc.0
Via: SIP/2.0/UDP 185.238.173.56;rport=5060;received=185.238.173.56;branch=z9hG4bKdTvUwagS
Call-ID: 24-3991E3D9-693A43970002F86D-02BFE6C0
From: <sip:s@31.97.210.100>;tag=sip_registrar
To: <sip:s@31.97.210.100>;tag=z9hG4bK09b8.0f444e31dbd1196924df1b9f199326cc.0
CSeq: 10 OPTIONS
Accept: application/xpidf+xml, application/cpim-pidf+xml, application/dialog-info+xml, application/simple-message-summary, application/pidf+xml, application/pidf+xml, application/dialog-info+xml, application/simple-message-summary, application/sdp, message/sipfrag;version=2.0
Allow: OPTIONS, REGISTER, SUBSCRIBE, NOTIFY, PUBLISH, INVITE, ACK, BYE, CANCEL, UPDATE, PRACK, INFO, MESSAGE, REFER
Supported: 100rel, timer, replaces, norefersub
Accept-Encoding: identity
Accept-Language: en
Server: omnileads
Content-Length:  0


<--- Received SIP response (425 bytes) from UDP:192.76.120.10:5060 --->
SIP/2.0 200 Keepalive P20
Via: SIP/2.0/UDP 31.97.210.100:5060;rport=5060;received=31.97.210.100;branch=z9hG4bKPjf961f09b-eb59-423d-8e97-0bdf10eab77a
From: <sip:telnyx_tollfree_in@31.97.210.100>;tag=f2884e3b-cb88-4c1a-940b-234d79392f2d
To: <sip:sip.telnyx.com>;tag=dfb4940bfc7117e4d7fa62ed6ef36d37.a68f8d47
Call-ID: d75f252a-76a4-4913-b748-d7da647cb39f
CSeq: 37761 OPTIONS
Server: Telnyx SIP Proxy
Content-Length: 0


<--- Transmitting SIP request (411 bytes) to UDP:46.19.213.14:5060 --->
OPTIONS sip:46.19.213.14:5060 SIP/2.0
Via: SIP/2.0/UDP 31.97.210.100:5060;rport;branch=z9hG4bKPjfd3c95eb-a8da-4b8c-99e4-6ba0d41d7c69
From: <sip:didww_in@31.97.210.100>;tag=4f0081f4-d246-412b-93a3-821f2290a712
To: <sip:46.19.213.14>
Contact: <sip:didww_in@31.97.210.100:5060>
Call-ID: 6c3e5089-b011-48d8-b960-7ee3d1ed4c71
CSeq: 29601 OPTIONS
Max-Forwards: 20
User-Agent: omnileads
Content-Length:  0


<--- Transmitting SIP request (411 bytes) to UDP:46.19.209.14:5060 --->
OPTIONS sip:46.19.209.14:5060 SIP/2.0
Via: SIP/2.0/UDP 31.97.210.100:5060;rport;branch=z9hG4bKPjb9f369a3-e29f-4318-ac0a-1c7be0ccd0ea
From: <sip:didww_in@31.97.210.100>;tag=75e69943-ceb9-4a04-9d64-40c8407ef29e
To: <sip:46.19.209.14>
Contact: <sip:didww_in@31.97.210.100:5060>
Call-ID: 99744b8e-9c17-4d75-811e-6e8b700a8b7b
CSeq: 48025 OPTIONS
Max-Forwards: 20
User-Agent: omnileads
Content-Length:  0


<--- Transmitting SIP request (411 bytes) to UDP:46.19.214.14:5060 --->
OPTIONS sip:46.19.214.14:5060 SIP/2.0
Via: SIP/2.0/UDP 31.97.210.100:5060;rport;branch=z9hG4bKPjac524955-e70e-4df2-81d7-b9530d6555e3
From: <sip:didww_in@31.97.210.100>;tag=c77d5bd3-982a-4670-9b6f-2aa02c1fd678
To: <sip:46.19.214.14>
Contact: <sip:didww_in@31.97.210.100:5060>
Call-ID: 17732b0e-a4ae-43c7-b807-6cfcd5514871
CSeq: 27428 OPTIONS
Max-Forwards: 20
User-Agent: omnileads
Content-Length:  0


<--- Transmitting SIP request (411 bytes) to UDP:46.19.212.14:5060 --->
OPTIONS sip:46.19.212.14:5060 SIP/2.0
Via: SIP/2.0/UDP 31.97.210.100:5060;rport;branch=z9hG4bKPj060fb3a1-a748-435a-8423-a49919c5587c
From: <sip:didww_in@31.97.210.100>;tag=fc386ab1-6808-421e-a819-bc3a32c51b8a
To: <sip:46.19.212.14>
Contact: <sip:didww_in@31.97.210.100:5060>
Call-ID: 21585644-de0d-4d77-970d-0eb58fb63ec6
CSeq: 38634 OPTIONS
Max-Forwards: 20
User-Agent: omnileads
Content-Length:  0


<--- Transmitting SIP request (411 bytes) to UDP:46.19.210.14:5060 --->
OPTIONS sip:46.19.210.14:5060 SIP/2.0
Via: SIP/2.0/UDP 31.97.210.100:5060;rport;branch=z9hG4bKPjf09177e2-f2d5-42cc-a550-cce9aefc2c1c
From: <sip:didww_in@31.97.210.100>;tag=ca02f94d-d78a-41da-a12d-fa518187a200
To: <sip:46.19.210.14>
Contact: <sip:didww_in@31.97.210.100:5060>
Call-ID: 490a4a74-4fa2-4383-b9e7-df105d1a431f
CSeq: 24565 OPTIONS
Max-Forwards: 20
User-Agent: omnileads
Content-Length:  0


<--- Transmitting SIP request (411 bytes) to UDP:46.19.215.14:5060 --->
OPTIONS sip:46.19.215.14:5060 SIP/2.0
Via: SIP/2.0/UDP 31.97.210.100:5060;rport;branch=z9hG4bKPj18f3921c-e1a7-4402-9bc5-61df8a92566b
From: <sip:didww_in@31.97.210.100>;tag=758d9ddb-eeb6-4f0e-8589-11d66e91ade5
To: <sip:46.19.215.14>
Contact: <sip:didww_in@31.97.210.100:5060>
Call-ID: 6e0ccd47-66d6-4006-9ead-497848f5564f
CSeq: 18344 OPTIONS
Max-Forwards: 20
User-Agent: omnileads
Content-Length:  0


<--- Received SIP response (404 bytes) from UDP:46.19.212.14:5060 --->
SIP/2.0 200 OK
Via: SIP/2.0/UDP 31.97.210.100:5060;rport=5060;branch=z9hG4bKPj060fb3a1-a748-435a-8423-a49919c5587c;received=31.97.210.100
From: <sip:didww_in@31.97.210.100>;tag=fc386ab1-6808-421e-a819-bc3a32c51b8a
To: <sip:46.19.212.14>;tag=3da5f524088720f97d47b11b6f6c07d2.e255f3ab
Call-ID: 21585644-de0d-4d77-970d-0eb58fb63ec6
CSeq: 38634 OPTIONS
Server: OOD responder v982
Content-Length: 0


<--- Received SIP response (404 bytes) from UDP:46.19.213.14:5060 --->
SIP/2.0 200 OK
Via: SIP/2.0/UDP 31.97.210.100:5060;rport=5060;branch=z9hG4bKPjfd3c95eb-a8da-4b8c-99e4-6ba0d41d7c69;received=31.97.210.100
From: <sip:didww_in@31.97.210.100>;tag=4f0081f4-d246-412b-93a3-821f2290a712
To: <sip:46.19.213.14>;tag=38a0c2c677151c484275ef4c700e9780.b5a2594f
Call-ID: 6c3e5089-b011-48d8-b960-7ee3d1ed4c71
CSeq: 29601 OPTIONS
Server: OOD responder v982
Content-Length: 0


<--- Received SIP response (404 bytes) from UDP:46.19.209.14:5060 --->
SIP/2.0 200 OK
Via: SIP/2.0/UDP 31.97.210.100:5060;rport=5060;branch=z9hG4bKPjb9f369a3-e29f-4318-ac0a-1c7be0ccd0ea;received=31.97.210.100
From: <sip:didww_in@31.97.210.100>;tag=75e69943-ceb9-4a04-9d64-40c8407ef29e
To: <sip:46.19.209.14>;tag=815cbf4cfc3e75322dd43ade78dddabe.8b0543c7
Call-ID: 99744b8e-9c17-4d75-811e-6e8b700a8b7b
CSeq: 48025 OPTIONS
Server: OOD responder v982
Content-Length: 0


<--- Received SIP response (404 bytes) from UDP:46.19.210.14:5060 --->
SIP/2.0 200 OK
Via: SIP/2.0/UDP 31.97.210.100:5060;rport=5060;received=31.97.210.100;branch=z9hG4bKPjf09177e2-f2d5-42cc-a550-cce9aefc2c1c
From: <sip:didww_in@31.97.210.100>;tag=ca02f94d-d78a-41da-a12d-fa518187a200
To: <sip:46.19.210.14>;tag=96ef325e4e1162bc586f6ca7aebc6156.fe87c481
Call-ID: 490a4a74-4fa2-4383-b9e7-df105d1a431f
CSeq: 24565 OPTIONS
Server: OOD responder v982
Content-Length: 0


<--- Received SIP response (404 bytes) from UDP:46.19.215.14:5060 --->
SIP/2.0 200 OK
Via: SIP/2.0/UDP 31.97.210.100:5060;rport=5060;branch=z9hG4bKPj18f3921c-e1a7-4402-9bc5-61df8a92566b;received=31.97.210.100
From: <sip:didww_in@31.97.210.100>;tag=758d9ddb-eeb6-4f0e-8589-11d66e91ade5
To: <sip:46.19.215.14>;tag=55c2b85e75369b5eabe2298586181ab0.25aefb1f
Call-ID: 6e0ccd47-66d6-4006-9ead-497848f5564f
CSeq: 18344 OPTIONS
Server: OOD responder v982
Content-Length: 0


<--- Received SIP response (404 bytes) from UDP:46.19.214.14:5060 --->
SIP/2.0 200 OK
Via: SIP/2.0/UDP 31.97.210.100:5060;rport=5060;branch=z9hG4bKPjac524955-e70e-4df2-81d7-b9530d6555e3;received=31.97.210.100
From: <sip:didww_in@31.97.210.100>;tag=c77d5bd3-982a-4670-9b6f-2aa02c1fd678
To: <sip:46.19.214.14>;tag=bddf0df813859b89a3162cb18023743a.3ec424e2
Call-ID: 17732b0e-a4ae-43c7-b807-6cfcd5514871
CSeq: 27428 OPTIONS
Server: OOD responder v982
Content-Length: 0


<--- Received SIP request (477 bytes) from UDP:46.19.213.54:5060 --->
OPTIONS sip:s@31.97.210.100:5060 SIP/2.0
Via: SIP/2.0/UDP 46.19.213.54;branch=z9hG4bKfd9b.a79514e055c8f75dae0099b41401b9cb.0
Via: SIP/2.0/UDP 46.19.213.55;received=46.19.213.55;branch=z9hG4bKyga9qaT4;rport=5060
From: sip:s@31.97.210.100:5060;tag=sip_registrar
To: sip:s@31.97.210.100:5060
CSeq: 10 OPTIONS
Call-ID: 17-6C31DC11-693A4398000B858B-F29FC6C0
Max-Forwards: 69
User-Agent: DIDWW Y SBC node
Contact: <sip:46.19.213.55:5060;transport=udp>
Content-Length: 0


<--- Transmitting SIP response (951 bytes) to UDP:46.19.213.54:5060 --->
SIP/2.0 404 Not Found
Via: SIP/2.0/UDP 46.19.213.54;rport=5060;received=46.19.213.54;branch=z9hG4bKfd9b.a79514e055c8f75dae0099b41401b9cb.0
Via: SIP/2.0/UDP 46.19.213.55;rport=5060;received=46.19.213.55;branch=z9hG4bKyga9qaT4
Call-ID: 17-6C31DC11-693A4398000B858B-F29FC6C0
From: <sip:s@31.97.210.100>;tag=sip_registrar
To: <sip:s@31.97.210.100>;tag=z9hG4bKfd9b.a79514e055c8f75dae0099b41401b9cb.0
CSeq: 10 OPTIONS
Accept: application/xpidf+xml, application/cpim-pidf+xml, application/dialog-info+xml, application/simple-message-summary, application/pidf+xml, application/pidf+xml, application/dialog-info+xml, application/simple-message-summary, application/sdp, message/sipfrag;version=2.0
Allow: OPTIONS, REGISTER, SUBSCRIBE, NOTIFY, PUBLISH, INVITE, ACK, BYE, CANCEL, UPDATE, PRACK, INFO, MESSAGE, REFER
Supported: 100rel, timer, replaces, norefersub
Accept-Encoding: identity
Accept-Language: en
Server: omnileads
Content-Length:  0


<--- Received SIP request (477 bytes) from UDP:46.19.209.44:5060 --->
OPTIONS sip:s@31.97.210.100:5060 SIP/2.0
Via: SIP/2.0/UDP 46.19.209.44;branch=z9hG4bK6b19.63775c0385920f565492d7dc9231f167.0
Via: SIP/2.0/UDP 46.19.209.17;received=46.19.209.17;branch=z9hG4bKmX62WaEJ;rport=5060
From: sip:s@31.97.210.100:5060;tag=sip_registrar
To: sip:s@31.97.210.100:5060
CSeq: 10 OPTIONS
Call-ID: 10-16BC6C73-693A439A00040726-4A9FF6C0
Max-Forwards: 69
User-Agent: DIDWW Y SBC node
Contact: <sip:46.19.209.17:5060;transport=udp>
Content-Length: 0


<--- Transmitting SIP response (951 bytes) to UDP:46.19.209.44:5060 --->
SIP/2.0 404 Not Found
Via: SIP/2.0/UDP 46.19.209.44;rport=5060;received=46.19.209.44;branch=z9hG4bK6b19.63775c0385920f565492d7dc9231f167.0
Via: SIP/2.0/UDP 46.19.209.17;rport=5060;received=46.19.209.17;branch=z9hG4bKmX62WaEJ
Call-ID: 10-16BC6C73-693A439A00040726-4A9FF6C0
From: <sip:s@31.97.210.100>;tag=sip_registrar
To: <sip:s@31.97.210.100>;tag=z9hG4bK6b19.63775c0385920f565492d7dc9231f167.0
CSeq: 10 OPTIONS
Accept: application/xpidf+xml, application/cpim-pidf+xml, application/dialog-info+xml, application/simple-message-summary, application/pidf+xml, application/pidf+xml, application/dialog-info+xml, application/simple-message-summary, application/sdp, message/sipfrag;version=2.0
Allow: OPTIONS, REGISTER, SUBSCRIBE, NOTIFY, PUBLISH, INVITE, ACK, BYE, CANCEL, UPDATE, PRACK, INFO, MESSAGE, REFER
Supported: 100rel, timer, replaces, norefersub
Accept-Encoding: identity
Accept-Language: en
Server: omnileads
Content-Length:  0


<--- Received SIP request (485 bytes) from UDP:185.238.173.44:5060 --->
OPTIONS sip:s@31.97.210.100:5060 SIP/2.0
Via: SIP/2.0/UDP 185.238.173.44;branch=z9hG4bK3cf9.1b1291ebf3fed783a7b9c2e638e35e8b.0
Via: SIP/2.0/UDP 185.238.173.55;received=185.238.173.55;branch=z9hG4bKgSQIea7a;rport=5060
From: sip:s@31.97.210.100:5060;tag=sip_registrar
To: sip:s@31.97.210.100:5060
CSeq: 10 OPTIONS
Call-ID: 23-6B209FB6-693A439B0005DAB8-76BFE6C0
Max-Forwards: 69
User-Agent: DIDWW Y SBC node
Contact: <sip:185.238.173.55:5060;transport=udp>
Content-Length: 0


<--- Transmitting SIP response (959 bytes) to UDP:185.238.173.44:5060 --->
SIP/2.0 404 Not Found
Via: SIP/2.0/UDP 185.238.173.44;rport=5060;received=185.238.173.44;branch=z9hG4bK3cf9.1b1291ebf3fed783a7b9c2e638e35e8b.0
Via: SIP/2.0/UDP 185.238.173.55;rport=5060;received=185.238.173.55;branch=z9hG4bKgSQIea7a
Call-ID: 23-6B209FB6-693A439B0005DAB8-76BFE6C0
From: <sip:s@31.97.210.100>;tag=sip_registrar
To: <sip:s@31.97.210.100>;tag=z9hG4bK3cf9.1b1291ebf3fed783a7b9c2e638e35e8b.0
CSeq: 10 OPTIONS
Accept: application/xpidf+xml, application/cpim-pidf+xml, application/dialog-info+xml, application/simple-message-summary, application/pidf+xml, application/pidf+xml, application/dialog-info+xml, application/simple-message-summary, application/sdp, message/sipfrag;version=2.0
Allow: OPTIONS, REGISTER, SUBSCRIBE, NOTIFY, PUBLISH, INVITE, ACK, BYE, CANCEL, UPDATE, PRACK, INFO, MESSAGE, REFER
Supported: 100rel, timer, replaces, norefersub
Accept-Encoding: identity
Accept-Language: en
Server: omnileads
Content-Length:  0


srv1137148*CLI>
Disconnected from Asterisk server
Asterisk cleanly ending (0).
Executing last minute cleanups
[root@srv1137148 ~]#