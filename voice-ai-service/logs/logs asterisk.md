[root@srv1137148 ~]# podman exec -it oml-asterisk-server asterisk -rvvvvv
Asterisk 20.14.0, Copyright (C) 1999 - 2025, Sangoma Technologies Corporation and others.
Created by Mark Spencer <markster@digium.com>
Asterisk comes with ABSOLUTELY NO WARRANTY; type 'core show warranty' for details.
This is free software, with components licensed under the GNU General Public
License version 2 and other licenses; you are welcome to redistribute it under
certain conditions. Type 'core show license' for details.
=========================================================================
Connected to Asterisk 20.14.0 currently running on srv1137148 (pid = 1)
<--- Transmitting SIP request (429 bytes) to UDP:190.92.90.136:5060 --->
OPTIONS sip:xpb.cablecolor.hn:5060 SIP/2.0
Via: SIP/2.0/UDP 31.97.210.100:5060;rport;branch=z9hG4bKPja8fa7e99-9f42-475b-94a9-5ee18e440a72
From: <sip:50642052929@xpb.cablecolor.hn>;tag=f555a9c9-fd71-4b4b-8e62-78552071af1a
To: <sip:xpb.cablecolor.hn>
Contact: <sip:omnileads@31.97.210.100:5060>
Call-ID: a1145e7a-d2a2-4863-ab26-c56d8908c927
CSeq: 37805 OPTIONS
Max-Forwards: 20
User-Agent: omnileads
Content-Length:  0


<--- Received SIP response (386 bytes) from UDP:190.92.90.136:5060 --->
SIP/2.0 404 Not Found
From: <sip:50642052929@xpb.cablecolor.hn>;tag=f555a9c9-fd71-4b4b-8e62-78552071af1a
To: <sip:xpb.cablecolor.hn>;tag=1089c412-5d3536fc-424fe2-7fdf367e8f78-100007f-13c4-7217
Call-ID: a1145e7a-d2a2-4863-ab26-c56d8908c927
CSeq: 37805 OPTIONS
Via: SIP/2.0/UDP 31.97.210.100:5060;rport=5060;branch=z9hG4bKPja8fa7e99-9f42-475b-94a9-5ee18e440a72
Content-Length: 0


<--- Received SIP request (477 bytes) from UDP:46.19.213.54:5060 --->
OPTIONS sip:s@31.97.210.100:5060 SIP/2.0
Via: SIP/2.0/UDP 46.19.213.54;branch=z9hG4bK50c4.43b97dec0dd6a42087b728de7c3ef1a5.0
Via: SIP/2.0/UDP 46.19.213.55;received=46.19.213.55;branch=z9hG4bK3IHGEatK;rport=5060
From: sip:s@31.97.210.100:5060;tag=sip_registrar
To: sip:s@31.97.210.100:5060
CSeq: 10 OPTIONS
Call-ID: 17-73F52668-693A55CA000B857D-F29FC6C0
Max-Forwards: 69
User-Agent: DIDWW Y SBC node
Contact: <sip:46.19.213.55:5060;transport=udp>
Content-Length: 0


<--- Transmitting SIP response (951 bytes) to UDP:46.19.213.54:5060 --->
SIP/2.0 404 Not Found
Via: SIP/2.0/UDP 46.19.213.54;rport=5060;received=46.19.213.54;branch=z9hG4bK50c4.43b97dec0dd6a42087b728de7c3ef1a5.0
Via: SIP/2.0/UDP 46.19.213.55;rport=5060;received=46.19.213.55;branch=z9hG4bK3IHGEatK
Call-ID: 17-73F52668-693A55CA000B857D-F29FC6C0
From: <sip:s@31.97.210.100>;tag=sip_registrar
To: <sip:s@31.97.210.100>;tag=z9hG4bK50c4.43b97dec0dd6a42087b728de7c3ef1a5.0
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
Via: SIP/2.0/UDP 46.19.213.54;branch=z9hG4bK6c76.0de1232e0279627ec0cf2aead108650f.0
Via: SIP/2.0/UDP 46.19.213.56;received=46.19.213.56;branch=z9hG4bKXOubPahr;rport=5060
From: sip:s@31.97.210.100:5060;tag=sip_registrar
To: sip:s@31.97.210.100:5060
CSeq: 10 OPTIONS
Call-ID: 18-10F07021-693A55CB0006F99A-A47FB6C0
Max-Forwards: 69
User-Agent: DIDWW Y SBC node
Contact: <sip:46.19.213.56:5060;transport=udp>
Content-Length: 0


<--- Transmitting SIP response (951 bytes) to UDP:46.19.213.54:5060 --->
SIP/2.0 404 Not Found
Via: SIP/2.0/UDP 46.19.213.54;rport=5060;received=46.19.213.54;branch=z9hG4bK6c76.0de1232e0279627ec0cf2aead108650f.0
Via: SIP/2.0/UDP 46.19.213.56;rport=5060;received=46.19.213.56;branch=z9hG4bKXOubPahr
Call-ID: 18-10F07021-693A55CB0006F99A-A47FB6C0
From: <sip:s@31.97.210.100>;tag=sip_registrar
To: <sip:s@31.97.210.100>;tag=z9hG4bK6c76.0de1232e0279627ec0cf2aead108650f.0
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
Via: SIP/2.0/UDP 185.238.173.44;branch=z9hG4bKe7f9.9e408a3dec5725a6e2ba00a04aef6e22.0
Via: SIP/2.0/UDP 185.238.173.55;received=185.238.173.55;branch=z9hG4bK3kD~wasx;rport=5060
From: sip:s@31.97.210.100:5060;tag=sip_registrar
To: sip:s@31.97.210.100:5060
CSeq: 10 OPTIONS
Call-ID: 23-750739B7-693A55CC0005DA0F-76BFE6C0
Max-Forwards: 69
User-Agent: DIDWW Y SBC node
Contact: <sip:185.238.173.55:5060;transport=udp>
Content-Length: 0


<--- Transmitting SIP response (959 bytes) to UDP:185.238.173.44:5060 --->
SIP/2.0 404 Not Found
Via: SIP/2.0/UDP 185.238.173.44;rport=5060;received=185.238.173.44;branch=z9hG4bKe7f9.9e408a3dec5725a6e2ba00a04aef6e22.0
Via: SIP/2.0/UDP 185.238.173.55;rport=5060;received=185.238.173.55;branch=z9hG4bK3kD~wasx
Call-ID: 23-750739B7-693A55CC0005DA0F-76BFE6C0
From: <sip:s@31.97.210.100>;tag=sip_registrar
To: <sip:s@31.97.210.100>;tag=z9hG4bKe7f9.9e408a3dec5725a6e2ba00a04aef6e22.0
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
Via: SIP/2.0/UDP 46.19.210.19;branch=z9hG4bKba46.dfb68e79d3280c2ad3cf76883c869d0d.0
Via: SIP/2.0/UDP 46.19.210.21;received=46.19.210.21;branch=z9hG4bKN~yi7aC9;rport=5060
From: sip:s@31.97.210.100:5060;tag=sip_registrar
To: sip:s@31.97.210.100:5060
CSeq: 10 OPTIONS
Call-ID: 12-28B20E93-693A55CE00016D45-891FA6C0
Max-Forwards: 69
User-Agent: DIDWW Y SBC node
Contact: <sip:46.19.210.21:5060;transport=udp>
Content-Length: 0


<--- Transmitting SIP response (951 bytes) to UDP:46.19.210.19:5060 --->
SIP/2.0 404 Not Found
Via: SIP/2.0/UDP 46.19.210.19;rport=5060;received=46.19.210.19;branch=z9hG4bKba46.dfb68e79d3280c2ad3cf76883c869d0d.0
Via: SIP/2.0/UDP 46.19.210.21;rport=5060;received=46.19.210.21;branch=z9hG4bKN~yi7aC9
Call-ID: 12-28B20E93-693A55CE00016D45-891FA6C0
From: <sip:s@31.97.210.100>;tag=sip_registrar
To: <sip:s@31.97.210.100>;tag=z9hG4bKba46.dfb68e79d3280c2ad3cf76883c869d0d.0
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
Via: SIP/2.0/UDP 46.19.209.44;branch=z9hG4bK7182.e6094edc85acc86030a72f8c48322545.0
Via: SIP/2.0/UDP 46.19.209.45;received=46.19.209.45;branch=z9hG4bK6PPoOa8d;rport=5060
From: sip:s@31.97.210.100:5060;tag=sip_registrar
To: sip:s@31.97.210.100:5060
CSeq: 10 OPTIONS
Call-ID: 11-6637088F-693A55CF000EF78D-AEBFB6C0
Max-Forwards: 69
User-Agent: DIDWW Y SBC node
Contact: <sip:46.19.209.45:5060;transport=udp>
Content-Length: 0


<--- Transmitting SIP response (951 bytes) to UDP:46.19.209.44:5060 --->
SIP/2.0 404 Not Found
Via: SIP/2.0/UDP 46.19.209.44;rport=5060;received=46.19.209.44;branch=z9hG4bK7182.e6094edc85acc86030a72f8c48322545.0
Via: SIP/2.0/UDP 46.19.209.45;rport=5060;received=46.19.209.45;branch=z9hG4bK6PPoOa8d
Call-ID: 11-6637088F-693A55CF000EF78D-AEBFB6C0
From: <sip:s@31.97.210.100>;tag=sip_registrar
To: <sip:s@31.97.210.100>;tag=z9hG4bK7182.e6094edc85acc86030a72f8c48322545.0
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
Via: SIP/2.0/UDP 31.97.210.100:5060;rport;branch=z9hG4bKPj8af03e1d-07cd-4082-b182-682a63c5414a
From: <sip:50642052929@xpb.cablecolor.hn>;tag=bf141bc3-c48b-4043-8e93-a3c95dacc4ba
To: <sip:xpb.cablecolor.hn>
Contact: <sip:omnileads@31.97.210.100:5060>
Call-ID: abab37de-67e1-4b1d-b1f3-cfb8c596c335
CSeq: 51561 OPTIONS
Max-Forwards: 20
User-Agent: omnileads
Content-Length:  0


<--- Received SIP response (386 bytes) from UDP:190.92.90.136:5060 --->
SIP/2.0 404 Not Found
From: <sip:50642052929@xpb.cablecolor.hn>;tag=bf141bc3-c48b-4043-8e93-a3c95dacc4ba
To: <sip:xpb.cablecolor.hn>;tag=5756edd8-1a6e544a-424feb-7fdf384a32d8-100007f-13c4-7217
Call-ID: abab37de-67e1-4b1d-b1f3-cfb8c596c335
CSeq: 51561 OPTIONS
Via: SIP/2.0/UDP 31.97.210.100:5060;rport=5060;branch=z9hG4bKPj8af03e1d-07cd-4082-b182-682a63c5414a
Content-Length: 0


<--- Transmitting SIP request (422 bytes) to UDP:46.19.212.54:5060 --->
OPTIONS sip:lac.us.out.didww.com SIP/2.0
Via: SIP/2.0/UDP 31.97.210.100:5060;rport;branch=z9hG4bKPj04576ced-6e7c-4927-a8b0-bfc2bd39e5e0
From: <sip:didwwout@31.97.210.100>;tag=a37a51d6-a4f0-4fcf-82a1-a3910bf37177
To: <sip:lac.us.out.didww.com>
Contact: <sip:didwwout@31.97.210.100:5060>
Call-ID: 3336a4fc-d833-41ba-8cf0-fc24b7cc75a3
CSeq: 55682 OPTIONS
Max-Forwards: 20
User-Agent: omnileads
Content-Length:  0


<--- Transmitting SIP request (422 bytes) to UDP:46.19.210.19:5060 --->
OPTIONS sip:fra.eu.out.didww.com SIP/2.0
Via: SIP/2.0/UDP 31.97.210.100:5060;rport;branch=z9hG4bKPj13c8af2f-a2d6-4db4-82f8-af35e5d29eb7
From: <sip:didwwout@31.97.210.100>;tag=3f4be828-cf4f-462f-8574-64b64dda3030
To: <sip:fra.eu.out.didww.com>
Contact: <sip:didwwout@31.97.210.100:5060>
Call-ID: 74d3a60d-b13d-437d-8152-88e1b8981c5a
CSeq: 32569 OPTIONS
Max-Forwards: 20
User-Agent: omnileads
Content-Length:  0


<--- Transmitting SIP request (413 bytes) to UDP:46.19.214.54:5060 --->
OPTIONS sip:sg.out.didww.com SIP/2.0
Via: SIP/2.0/UDP 31.97.210.100:5060;rport;branch=z9hG4bKPj8638fe39-2728-4005-a44b-836c58d84642
From: <sip:didwwout@31.97.210.100>;tag=d3be54bb-f12a-4c6a-938a-8d9a02591895
To: <sip:sg.out.didww.com>
Contact: <sip:didwwout@31.97.210.100:5060>
Call-ID: 33fdce24-11f2-4ad4-af23-75fdcf0e59ac
CSeq: 4270 OPTIONS
Max-Forwards: 20
User-Agent: omnileads
Content-Length:  0


<--- Transmitting SIP request (422 bytes) to UDP:185.238.173.44:5060 --->
OPTIONS sip:ams.eu.out.didww.com SIP/2.0
Via: SIP/2.0/UDP 31.97.210.100:5060;rport;branch=z9hG4bKPj5c433336-f2ec-4714-8fbc-1443d5caf633
From: <sip:didwwout@31.97.210.100>;tag=a6f95756-9353-40f3-a86a-ec629335094c
To: <sip:ams.eu.out.didww.com>
Contact: <sip:didwwout@31.97.210.100:5060>
Call-ID: 95b86268-8181-4c5d-bde7-e774b56ae916
CSeq: 62842 OPTIONS
Max-Forwards: 20
User-Agent: omnileads
Content-Length:  0


<--- Transmitting SIP request (422 bytes) to UDP:46.19.213.54:5060 --->
OPTIONS sip:mia.us.out.didww.com SIP/2.0
Via: SIP/2.0/UDP 31.97.210.100:5060;rport;branch=z9hG4bKPj3a554761-85d6-4e09-885d-b345ef1652dc
From: <sip:didwwout@31.97.210.100>;tag=aed1ea3e-72b2-478c-924a-58061cccbdb2
To: <sip:mia.us.out.didww.com>
Contact: <sip:didwwout@31.97.210.100:5060>
Call-ID: 0f11c880-555e-4395-a86e-547fa92d2204
CSeq: 64312 OPTIONS
Max-Forwards: 20
User-Agent: omnileads
Content-Length:  0


<--- Transmitting SIP request (422 bytes) to UDP:46.19.209.44:5060 --->
OPTIONS sip:nyc.us.out.didww.com SIP/2.0
Via: SIP/2.0/UDP 31.97.210.100:5060;rport;branch=z9hG4bKPje667e023-d1d6-4259-9562-8b6f52defd22
From: <sip:didwwout@31.97.210.100>;tag=e9932163-77ae-4db7-adba-77d7c348e2b4
To: <sip:nyc.us.out.didww.com>
Contact: <sip:didwwout@31.97.210.100:5060>
Call-ID: 4dcb30dc-fd31-4b8b-ba19-fa9cd6d747a0
CSeq: 25343 OPTIONS
Max-Forwards: 20
User-Agent: omnileads
Content-Length:  0


<--- Received SIP response (410 bytes) from UDP:46.19.212.54:5060 --->
SIP/2.0 200 OK
Via: SIP/2.0/UDP 31.97.210.100:5060;rport=5060;branch=z9hG4bKPj04576ced-6e7c-4927-a8b0-bfc2bd39e5e0;received=31.97.210.100
From: <sip:didwwout@31.97.210.100>;tag=a37a51d6-a4f0-4fcf-82a1-a3910bf37177
To: <sip:lac.us.out.didww.com>;tag=61925c026ca74f1a129239e9050e36be.aad3ec34
Call-ID: 3336a4fc-d833-41ba-8cf0-fc24b7cc75a3
CSeq: 55682 OPTIONS
Server: Y balancing node
Content-Length: 0


<--- Received SIP response (410 bytes) from UDP:46.19.213.54:5060 --->
SIP/2.0 200 OK
Via: SIP/2.0/UDP 31.97.210.100:5060;rport=5060;branch=z9hG4bKPj3a554761-85d6-4e09-885d-b345ef1652dc;received=31.97.210.100
From: <sip:didwwout@31.97.210.100>;tag=aed1ea3e-72b2-478c-924a-58061cccbdb2
To: <sip:mia.us.out.didww.com>;tag=9ff0357ea6c2a17cdf76a4da6b05bb83.e1b13e9e
Call-ID: 0f11c880-555e-4395-a86e-547fa92d2204
CSeq: 64312 OPTIONS
Server: Y balancing node
Content-Length: 0


<--- Received SIP response (410 bytes) from UDP:46.19.209.44:5060 --->
SIP/2.0 200 OK
Via: SIP/2.0/UDP 31.97.210.100:5060;rport=5060;branch=z9hG4bKPje667e023-d1d6-4259-9562-8b6f52defd22;received=31.97.210.100
From: <sip:didwwout@31.97.210.100>;tag=e9932163-77ae-4db7-adba-77d7c348e2b4
To: <sip:nyc.us.out.didww.com>;tag=54f5d7e3596166f6d64f70d164c45f5b.d8c085d7
Call-ID: 4dcb30dc-fd31-4b8b-ba19-fa9cd6d747a0
CSeq: 25343 OPTIONS
Server: Y balancing node
Content-Length: 0


<--- Received SIP response (410 bytes) from UDP:46.19.210.19:5060 --->
SIP/2.0 200 OK
Via: SIP/2.0/UDP 31.97.210.100:5060;rport=5060;branch=z9hG4bKPj13c8af2f-a2d6-4db4-82f8-af35e5d29eb7;received=31.97.210.100
From: <sip:didwwout@31.97.210.100>;tag=3f4be828-cf4f-462f-8574-64b64dda3030
To: <sip:fra.eu.out.didww.com>;tag=d36836d49580e308ee3d7ca9559ff322.ee4702fc
Call-ID: 74d3a60d-b13d-437d-8152-88e1b8981c5a
CSeq: 32569 OPTIONS
Server: Y balancing node
Content-Length: 0


<--- Received SIP response (410 bytes) from UDP:185.238.173.44:5060 --->
SIP/2.0 200 OK
Via: SIP/2.0/UDP 31.97.210.100:5060;rport=5060;branch=z9hG4bKPj5c433336-f2ec-4714-8fbc-1443d5caf633;received=31.97.210.100
From: <sip:didwwout@31.97.210.100>;tag=a6f95756-9353-40f3-a86a-ec629335094c
To: <sip:ams.eu.out.didww.com>;tag=f57f85949040ae77bb81993d3df59ad6.0bae1b78
Call-ID: 95b86268-8181-4c5d-bde7-e774b56ae916
CSeq: 62842 OPTIONS
Server: Y balancing node
Content-Length: 0


<--- Received SIP response (405 bytes) from UDP:46.19.214.54:5060 --->
SIP/2.0 200 OK
Via: SIP/2.0/UDP 31.97.210.100:5060;rport=5060;branch=z9hG4bKPj8638fe39-2728-4005-a44b-836c58d84642;received=31.97.210.100
From: <sip:didwwout@31.97.210.100>;tag=d3be54bb-f12a-4c6a-938a-8d9a02591895
To: <sip:sg.out.didww.com>;tag=4994c42b455d25638b884b484c011b88.69e05aa0
Call-ID: 33fdce24-11f2-4ad4-af23-75fdcf0e59ac
CSeq: 4270 OPTIONS
Server: Y balancing node
Content-Length: 0


<--- Transmitting SIP request (429 bytes) to UDP:192.76.120.10:5060 --->
OPTIONS sip:sip.telnyx.com:5060 SIP/2.0
Via: SIP/2.0/UDP 31.97.210.100:5060;rport;branch=z9hG4bKPj249e8063-a387-48f1-b15e-d7f6026b8712
From: <sip:telnyx_local_in@31.97.210.100>;tag=50840de4-be78-426f-9b0c-8e2854697198
To: <sip:sip.telnyx.com>
Contact: <sip:telnyx_local_in@31.97.210.100:5060>
Call-ID: 9fc5c287-c139-4aef-bd02-ccbf3f1b21b6
CSeq: 63402 OPTIONS
Max-Forwards: 20
User-Agent: omnileads
Content-Length:  0


<--- Received SIP response (422 bytes) from UDP:192.76.120.10:5060 --->
SIP/2.0 200 Keepalive P20
Via: SIP/2.0/UDP 31.97.210.100:5060;rport=5060;received=31.97.210.100;branch=z9hG4bKPj249e8063-a387-48f1-b15e-d7f6026b8712
From: <sip:telnyx_local_in@31.97.210.100>;tag=50840de4-be78-426f-9b0c-8e2854697198
To: <sip:sip.telnyx.com>;tag=dfb4940bfc7117e4d7fa62ed6ef36d37.f0f05606
Call-ID: 9fc5c287-c139-4aef-bd02-ccbf3f1b21b6
CSeq: 63402 OPTIONS
Server: Telnyx SIP Proxy
Content-Length: 0


<--- Received SIP request (477 bytes) from UDP:46.19.210.19:5060 --->
OPTIONS sip:s@31.97.210.100:5060 SIP/2.0
Via: SIP/2.0/UDP 46.19.210.19;branch=z9hG4bK888a.79a6647f076063521ba72214ff0714e8.0
Via: SIP/2.0/UDP 46.19.210.17;received=46.19.210.17;branch=z9hG4bKGBDbRaGz;rport=5060
From: sip:s@31.97.210.100:5060;tag=sip_registrar
To: sip:s@31.97.210.100:5060
CSeq: 10 OPTIONS
Call-ID: 13-66C4D94A-693A55D300026629-80AFC6C0
Max-Forwards: 69
User-Agent: DIDWW Y SBC node
Contact: <sip:46.19.210.17:5060;transport=udp>
Content-Length: 0


<--- Transmitting SIP response (951 bytes) to UDP:46.19.210.19:5060 --->
SIP/2.0 404 Not Found
Via: SIP/2.0/UDP 46.19.210.19;rport=5060;received=46.19.210.19;branch=z9hG4bK888a.79a6647f076063521ba72214ff0714e8.0
Via: SIP/2.0/UDP 46.19.210.17;rport=5060;received=46.19.210.17;branch=z9hG4bKGBDbRaGz
Call-ID: 13-66C4D94A-693A55D300026629-80AFC6C0
From: <sip:s@31.97.210.100>;tag=sip_registrar
To: <sip:s@31.97.210.100>;tag=z9hG4bK888a.79a6647f076063521ba72214ff0714e8.0
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
Via: SIP/2.0/UDP 185.238.173.44;branch=z9hG4bK6a31.c0d1140006caf549f0cfa5a5a1b1341d.0
Via: SIP/2.0/UDP 185.238.173.56;received=185.238.173.56;branch=z9hG4bKFaHUQaBv;rport=5060
From: sip:s@31.97.210.100:5060;tag=sip_registrar
To: sip:s@31.97.210.100:5060
CSeq: 10 OPTIONS
Call-ID: 24-4172040E-693A55D30002F83F-02BFE6C0
Max-Forwards: 69
User-Agent: DIDWW Y SBC node
Contact: <sip:185.238.173.56:5060;transport=udp>
Content-Length: 0


<--- Transmitting SIP response (959 bytes) to UDP:185.238.173.44:5060 --->
SIP/2.0 404 Not Found
Via: SIP/2.0/UDP 185.238.173.44;rport=5060;received=185.238.173.44;branch=z9hG4bK6a31.c0d1140006caf549f0cfa5a5a1b1341d.0
Via: SIP/2.0/UDP 185.238.173.56;rport=5060;received=185.238.173.56;branch=z9hG4bKFaHUQaBv
Call-ID: 24-4172040E-693A55D30002F83F-02BFE6C0
From: <sip:s@31.97.210.100>;tag=sip_registrar
To: <sip:s@31.97.210.100>;tag=z9hG4bK6a31.c0d1140006caf549f0cfa5a5a1b1341d.0
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
Via: SIP/2.0/UDP 46.19.214.54;branch=z9hG4bKb195.f056b873e913c404210488f8416b08f0.0
Via: SIP/2.0/UDP 46.19.214.55;received=46.19.214.55;branch=z9hG4bKoJQOba11;rport=5060
From: sip:s@31.97.210.100:5060;tag=sip_registrar
To: sip:s@31.97.210.100:5060
CSeq: 10 OPTIONS
Call-ID: 19-3B064ABE-693A55D3000CC3A4-18AFA6C0
Max-Forwards: 69
User-Agent: DIDWW Y SBC node
Contact: <sip:46.19.214.55:5060;transport=udp>
Content-Length: 0


<--- Transmitting SIP response (951 bytes) to UDP:46.19.214.54:5060 --->
SIP/2.0 404 Not Found
Via: SIP/2.0/UDP 46.19.214.54;rport=5060;received=46.19.214.54;branch=z9hG4bKb195.f056b873e913c404210488f8416b08f0.0
Via: SIP/2.0/UDP 46.19.214.55;rport=5060;received=46.19.214.55;branch=z9hG4bKoJQOba11
Call-ID: 19-3B064ABE-693A55D3000CC3A4-18AFA6C0
From: <sip:s@31.97.210.100>;tag=sip_registrar
To: <sip:s@31.97.210.100>;tag=z9hG4bKb195.f056b873e913c404210488f8416b08f0.0
CSeq: 10 OPTIONS
Accept: application/xpidf+xml, application/cpim-pidf+xml, application/dialog-info+xml, application/simple-message-summary, application/pidf+xml, application/pidf+xml, application/dialog-info+xml, application/simple-message-summary, application/sdp, message/sipfrag;version=2.0
Allow: OPTIONS, REGISTER, SUBSCRIBE, NOTIFY, PUBLISH, INVITE, ACK, BYE, CANCEL, UPDATE, PRACK, INFO, MESSAGE, REFER
Supported: 100rel, timer, replaces, norefersub
Accept-Encoding: identity
Accept-Language: en
Server: omnileads
Content-Length:  0


<--- Received SIP request (431 bytes) from UDP:127.0.0.1:10060 --->
REGISTER sip:31.97.210.100:5160 SIP/2.0
Via: SIP/2.0/UDP 127.0.0.1:10060;branch=z9hG4bKe19c.0b1cc716000000000000000000000000.0
To: <sip:1002@31.97.210.100>
From: <sip:1002@31.97.210.100>;tag=8225290983f14b421b54a1ba064fe336-c56bcd57
CSeq: 10 REGISTER
Call-ID: 119e36de43ace11a-21@127.0.0.1
Max-Forwards: 70
Content-Length: 0
User-Agent: kamailio (5.8.3 (x86_64/linux))
Contact: <sip:1002@127.0.0.1:10060>
Expires: 120


<--- Transmitting SIP response (499 bytes) to UDP:127.0.0.1:10060 --->
SIP/2.0 200 OK
Via: SIP/2.0/UDP 127.0.0.1:10060;received=127.0.0.1;branch=z9hG4bKe19c.0b1cc716000000000000000000000000.0
Call-ID: 119e36de43ace11a-21@127.0.0.1
From: <sip:1002@31.97.210.100>;tag=8225290983f14b421b54a1ba064fe336-c56bcd57
To: <sip:1002@31.97.210.100>;tag=z9hG4bKe19c.0b1cc716000000000000000000000000.0
CSeq: 10 REGISTER
Date: Thu, 11 Dec 2025 05:25:40 GMT
Contact: <sip:1002@127.0.0.1:10060>;expires=119
Expires: 120
Supported: path
Server: omnileads
Content-Length:  0


<--- Received SIP request (408 bytes) from UDP:127.0.0.1:10061 --->
OPTIONS sip:127.0.0.1:5260 SIP/2.0
Via: SIP/2.0/UDP 127.0.0.1:10061;rport;branch=z9hG4bKPjca53a641-3dff-4132-9a95-eb5543f682ab
From: <sip:pstn_gateway@31.97.210.100>;tag=fb34b115-4f26-442c-b075-350c1362b73f
To: <sip:127.0.0.1>
Contact: <sip:pstn_gateway@127.0.0.1:10061>
Call-ID: 13473e50-31b8-4662-91a6-70573666e383
CSeq: 36216 OPTIONS
Max-Forwards: 20
User-Agent: omnidialer
Content-Length:  0


<--- Transmitting SIP response (886 bytes) to UDP:127.0.0.1:10061 --->
SIP/2.0 200 OK
Via: SIP/2.0/UDP 127.0.0.1:10061;rport=10061;received=127.0.0.1;branch=z9hG4bKPjca53a641-3dff-4132-9a95-eb5543f682ab
Call-ID: 13473e50-31b8-4662-91a6-70573666e383
From: <sip:pstn_gateway@31.97.210.100>;tag=fb34b115-4f26-442c-b075-350c1362b73f
To: <sip:127.0.0.1>;tag=z9hG4bKPjca53a641-3dff-4132-9a95-eb5543f682ab
CSeq: 36216 OPTIONS
Accept: application/xpidf+xml, application/cpim-pidf+xml, application/dialog-info+xml, application/simple-message-summary, application/pidf+xml, application/pidf+xml, application/dialog-info+xml, application/simple-message-summary, application/sdp, message/sipfrag;version=2.0
Allow: OPTIONS, REGISTER, SUBSCRIBE, NOTIFY, PUBLISH, INVITE, ACK, BYE, CANCEL, UPDATE, PRACK, INFO, MESSAGE, REFER
Supported: 100rel, timer, replaces, norefersub
Accept-Encoding: identity
Accept-Language: en
Server: omnileads
Content-Length:  0


<--- Received SIP request (396 bytes) from UDP:127.0.0.1:10061 --->
OPTIONS sip:127.0.0.1:5260 SIP/2.0
Via: SIP/2.0/UDP 127.0.0.1:10061;rport;branch=z9hG4bKPjd34275aa-7c84-4d85-be19-e6f7f0ade358
From: <sip:omlacd@31.97.210.100>;tag=efb71361-140c-4fcd-9ac9-b432649cf9cb
To: <sip:127.0.0.1>
Contact: <sip:omlacd@127.0.0.1:10061>
Call-ID: 3fb09966-52dc-4be3-b518-e4144faf7484
CSeq: 39937 OPTIONS
Max-Forwards: 20
User-Agent: omnidialer
Content-Length:  0


<--- Transmitting SIP response (880 bytes) to UDP:127.0.0.1:10061 --->
SIP/2.0 200 OK
Via: SIP/2.0/UDP 127.0.0.1:10061;rport=10061;received=127.0.0.1;branch=z9hG4bKPjd34275aa-7c84-4d85-be19-e6f7f0ade358
Call-ID: 3fb09966-52dc-4be3-b518-e4144faf7484
From: <sip:omlacd@31.97.210.100>;tag=efb71361-140c-4fcd-9ac9-b432649cf9cb
To: <sip:127.0.0.1>;tag=z9hG4bKPjd34275aa-7c84-4d85-be19-e6f7f0ade358
CSeq: 39937 OPTIONS
Accept: application/xpidf+xml, application/cpim-pidf+xml, application/dialog-info+xml, application/simple-message-summary, application/pidf+xml, application/pidf+xml, application/dialog-info+xml, application/simple-message-summary, application/sdp, message/sipfrag;version=2.0
Allow: OPTIONS, REGISTER, SUBSCRIBE, NOTIFY, PUBLISH, INVITE, ACK, BYE, CANCEL, UPDATE, PRACK, INFO, MESSAGE, REFER
Supported: 100rel, timer, replaces, norefersub
Accept-Encoding: identity
Accept-Language: en
Server: omnileads
Content-Length:  0


<--- Received SIP request (477 bytes) from UDP:46.19.212.54:5060 --->
OPTIONS sip:s@31.97.210.100:5060 SIP/2.0
Via: SIP/2.0/UDP 46.19.212.54;branch=z9hG4bKbb45.a6232978d77b458920fb5145ca6a5b64.0
Via: SIP/2.0/UDP 46.19.212.56;received=46.19.212.56;branch=z9hG4bKzx5Ckap3;rport=5060
From: sip:s@31.97.210.100:5060;tag=sip_registrar
To: sip:s@31.97.210.100:5060
CSeq: 10 OPTIONS
Call-ID: 16-3D47BD5A-693A55DB00003F8B-F33FD6C0
Max-Forwards: 69
User-Agent: DIDWW Y SBC node
Contact: <sip:46.19.212.56:5060;transport=udp>
Content-Length: 0


<--- Transmitting SIP response (951 bytes) to UDP:46.19.212.54:5060 --->
SIP/2.0 404 Not Found
Via: SIP/2.0/UDP 46.19.212.54;rport=5060;received=46.19.212.54;branch=z9hG4bKbb45.a6232978d77b458920fb5145ca6a5b64.0
Via: SIP/2.0/UDP 46.19.212.56;rport=5060;received=46.19.212.56;branch=z9hG4bKzx5Ckap3
Call-ID: 16-3D47BD5A-693A55DB00003F8B-F33FD6C0
From: <sip:s@31.97.210.100>;tag=sip_registrar
To: <sip:s@31.97.210.100>;tag=z9hG4bKbb45.a6232978d77b458920fb5145ca6a5b64.0
CSeq: 10 OPTIONS
Accept: application/xpidf+xml, application/cpim-pidf+xml, application/dialog-info+xml, application/simple-message-summary, application/pidf+xml, application/pidf+xml, application/dialog-info+xml, application/simple-message-summary, application/sdp, message/sipfrag;version=2.0
Allow: OPTIONS, REGISTER, SUBSCRIBE, NOTIFY, PUBLISH, INVITE, ACK, BYE, CANCEL, UPDATE, PRACK, INFO, MESSAGE, REFER
Supported: 100rel, timer, replaces, norefersub
Accept-Encoding: identity
Accept-Language: en
Server: omnileads
Content-Length:  0


  == Manager 'omnileads' logged on from 31.97.210.100
[Dec 10 23:25:47] SECURITY[73]: res_security_log.c:114 security_event_stasis_cb: SecurityEvent="SuccessfulAuth",EventTV="2025-12-10T23:25:47.191-0600",Severity="Informational",Service="AMI",EventVersion="1",AccountID="omnileads",SessionID="0x56322fcc25c0",LocalAddress="IPV4/TCP/31.97.210.100/5038",RemoteAddress="IPV4/TCP/31.97.210.100/33992",UsingPassword="0",SessionTV="2025-12-10T23:25:47.191-0600"
  == Manager 'omnileads' logged off from 31.97.210.100
<--- Transmitting SIP request (423 bytes) to UDP:127.0.0.1:10060 --->
OPTIONS sip:1002@127.0.0.1:10060 SIP/2.0
Via: SIP/2.0/UDP 31.97.210.100:5160;rport;branch=z9hG4bKPj123fc5cd-60a6-4768-a5ea-92c03f8fe894
From: <sip:1002@31.97.210.100>;tag=fc614f9d-43d1-4e9f-ba5a-b7a57b56db3a
To: <sip:1002@127.0.0.1>
Contact: <sip:1002@31.97.210.100:5160>
Call-ID: 52e00acc-ca6c-4d9d-8455-783be94fffd9
CSeq: 583 OPTIONS
Supported: path
Max-Forwards: 20
User-Agent: omnileads
Content-Length:  0


<--- Received SIP response (475 bytes) from UDP:127.0.0.1:10060 --->
SIP/2.0 200 OK
Via: SIP/2.0/UDP 31.97.210.100:5160;received=31.97.210.100;rport=5160;branch=z9hG4bKPj123fc5cd-60a6-4768-a5ea-92c03f8fe894
To: <sip:1002@127.0.0.1>;tag=n5562didlr
From: <sip:1002@31.97.210.100>;tag=fc614f9d-43d1-4e9f-ba5a-b7a57b56db3a
Call-ID: 52e00acc-ca6c-4d9d-8455-783be94fffd9
CSeq: 583 OPTIONS
Allow: INVITE,ACK,CANCEL,BYE,UPDATE,MESSAGE,OPTIONS,REFER,INFO
Accept: application/sdp, application/dtmf-relay
Supported: outbound
Content-Length: 0


<--- Received SIP request (477 bytes) from UDP:46.19.209.44:5060 --->
OPTIONS sip:s@31.97.210.100:5060 SIP/2.0
Via: SIP/2.0/UDP 46.19.209.44;branch=z9hG4bKedc5.157d39c76717b9763fda139c308c33f8.0
Via: SIP/2.0/UDP 46.19.209.17;received=46.19.209.17;branch=z9hG4bKp9wQsai9;rport=5060
From: sip:s@31.97.210.100:5060;tag=sip_registrar
To: sip:s@31.97.210.100:5060
CSeq: 10 OPTIONS
Call-ID: 10-49B6CFD0-693A55DE00040695-4A9FF6C0
Max-Forwards: 69
User-Agent: DIDWW Y SBC node
Contact: <sip:46.19.209.17:5060;transport=udp>
Content-Length: 0


<--- Transmitting SIP response (951 bytes) to UDP:46.19.209.44:5060 --->
SIP/2.0 404 Not Found
Via: SIP/2.0/UDP 46.19.209.44;rport=5060;received=46.19.209.44;branch=z9hG4bKedc5.157d39c76717b9763fda139c308c33f8.0
Via: SIP/2.0/UDP 46.19.209.17;rport=5060;received=46.19.209.17;branch=z9hG4bKp9wQsai9
Call-ID: 10-49B6CFD0-693A55DE00040695-4A9FF6C0
From: <sip:s@31.97.210.100>;tag=sip_registrar
To: <sip:s@31.97.210.100>;tag=z9hG4bKedc5.157d39c76717b9763fda139c308c33f8.0
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
Via: SIP/2.0/UDP 31.97.210.100:5060;rport;branch=z9hG4bKPj2fc0ac89-1b08-4f4f-9909-7e56bf74b3c1
From: <sip:telnyx_tollfree_in@31.97.210.100>;tag=7a0dec63-1f72-4247-bd87-5774f94867cc
To: <sip:sip.telnyx.com>
Contact: <sip:telnyx_tollfree_in@31.97.210.100:5060>
Call-ID: 14135778-9418-486e-8f62-f762f36967f4
CSeq: 13725 OPTIONS
Max-Forwards: 20
User-Agent: omnileads
Content-Length:  0


<--- Received SIP response (425 bytes) from UDP:192.76.120.10:5060 --->
SIP/2.0 200 Keepalive P20
Via: SIP/2.0/UDP 31.97.210.100:5060;rport=5060;received=31.97.210.100;branch=z9hG4bKPj2fc0ac89-1b08-4f4f-9909-7e56bf74b3c1
From: <sip:telnyx_tollfree_in@31.97.210.100>;tag=7a0dec63-1f72-4247-bd87-5774f94867cc
To: <sip:sip.telnyx.com>;tag=dfb4940bfc7117e4d7fa62ed6ef36d37.f67aa6b7
Call-ID: 14135778-9418-486e-8f62-f762f36967f4
CSeq: 13725 OPTIONS
Server: Telnyx SIP Proxy
Content-Length: 0


<--- Received SIP request (350 bytes) from UDP:51.161.137.193:49315 --->
REGISTER sip:31.97.210.100 SIP/2.0
Via: SIP/2.0/UDP 51.161.137.193:49315;branch=z9hG4bK640809726
Max-Forwards: 70
From: <sip:2472@31.97.210.100>;tag=624010458
To: <sip:2472@31.97.210.100>
Call-ID: 213853520-1161802338-1677340342
CSeq: 1 REGISTER
Contact: <sip:2472@51.161.137.193:49315>
Content-Length: 0
User-Agent: Avaya IP Phone 1120E


[Dec 10 23:25:52] NOTICE[343]: res_pjsip/pjsip_distributor.c:688 log_failed_request: Request 'REGISTER' from '<sip:2472@31.97.210.100>' failed for '51.161.137.193:49315' (callid: 213853520-1161802338-1677340342) - No matching endpoint found
<--- Transmitting SIP response (469 bytes) to UDP:51.161.137.193:49315 --->
SIP/2.0 401 Unauthorized
Via: SIP/2.0/UDP 51.161.137.193:49315;rport=49315;received=51.161.137.193;branch=z9hG4bK640809726
Call-ID: 213853520-1161802338-1677340342
From: <sip:2472@31.97.210.100>;tag=624010458
To: <sip:2472@31.97.210.100>;tag=z9hG4bK640809726
CSeq: 1 REGISTER
WWW-Authenticate: Digest realm="asterisk",nonce="1765430752/a28d1c0281b40b1569fb36845d56cec4",opaque="21d2cdb23021c775",algorithm=MD5,qop="auth"
Server: omnileads
Content-Length:  0


[Dec 10 23:25:52] SECURITY[73]: res_security_log.c:114 security_event_stasis_cb: SecurityEvent="InvalidAccountID",EventTV="2025-12-10T23:25:52.275-0600",Severity="Error",Service="PJSIP",EventVersion="1",AccountID="2472",SessionID="213853520-1161802338-1677340342",LocalAddress="IPV4/UDP/31.97.210.100/5060",RemoteAddress="IPV4/UDP/51.161.137.193/49315"
[Dec 10 23:25:52] SECURITY[73]: res_security_log.c:114 security_event_stasis_cb: SecurityEvent="ChallengeSent",EventTV="2025-12-10T23:25:52.275-0600",Severity="Informational",Service="PJSIP",EventVersion="1",AccountID="<unknown>",SessionID="213853520-1161802338-1677340342",LocalAddress="IPV4/UDP/31.97.210.100/5060",RemoteAddress="IPV4/UDP/51.161.137.193/49315",Challenge=""
<--- Transmitting SIP request (411 bytes) to UDP:46.19.213.14:5060 --->
OPTIONS sip:46.19.213.14:5060 SIP/2.0
Via: SIP/2.0/UDP 31.97.210.100:5060;rport;branch=z9hG4bKPj843a9766-24c9-43c8-b8db-477c3449f1e2
From: <sip:didww_in@31.97.210.100>;tag=8460c54b-bc26-48f2-a296-f047a0c40ddb
To: <sip:46.19.213.14>
Contact: <sip:didww_in@31.97.210.100:5060>
Call-ID: 235e57d7-e820-43be-a262-e10a8e870123
CSeq: 10073 OPTIONS
Max-Forwards: 20
User-Agent: omnileads
Content-Length:  0


<--- Transmitting SIP request (410 bytes) to UDP:46.19.209.14:5060 --->
OPTIONS sip:46.19.209.14:5060 SIP/2.0
Via: SIP/2.0/UDP 31.97.210.100:5060;rport;branch=z9hG4bKPj0c50040b-d0ef-4765-8f9d-261d7e0485a3
From: <sip:didww_in@31.97.210.100>;tag=b32918f4-91c3-4b5b-b003-02cc6c0f8702
To: <sip:46.19.209.14>
Contact: <sip:didww_in@31.97.210.100:5060>
Call-ID: e868e6d3-3e68-4f1a-8d4c-407192e6d540
CSeq: 4434 OPTIONS
Max-Forwards: 20
User-Agent: omnileads
Content-Length:  0


<--- Transmitting SIP request (411 bytes) to UDP:46.19.214.14:5060 --->
OPTIONS sip:46.19.214.14:5060 SIP/2.0
Via: SIP/2.0/UDP 31.97.210.100:5060;rport;branch=z9hG4bKPj2bafbf62-5a2c-4bbd-affc-e96a2f80cef5
From: <sip:didww_in@31.97.210.100>;tag=0e69cb13-8736-4669-8f27-9fed17e3fca7
To: <sip:46.19.214.14>
Contact: <sip:didww_in@31.97.210.100:5060>
Call-ID: 97de4e03-8918-41d5-9cc7-684143046482
CSeq: 58043 OPTIONS
Max-Forwards: 20
User-Agent: omnileads
Content-Length:  0


<--- Transmitting SIP request (411 bytes) to UDP:46.19.212.14:5060 --->
OPTIONS sip:46.19.212.14:5060 SIP/2.0
Via: SIP/2.0/UDP 31.97.210.100:5060;rport;branch=z9hG4bKPje690d4d6-ec4e-47a6-ab60-39424715c1e5
From: <sip:didww_in@31.97.210.100>;tag=aaaa298a-baae-435a-b358-6f157e804114
To: <sip:46.19.212.14>
Contact: <sip:didww_in@31.97.210.100:5060>
Call-ID: a07fb03a-4d49-40ff-ae35-231663d9acbe
CSeq: 22684 OPTIONS
Max-Forwards: 20
User-Agent: omnileads
Content-Length:  0


<--- Transmitting SIP request (411 bytes) to UDP:46.19.210.14:5060 --->
OPTIONS sip:46.19.210.14:5060 SIP/2.0
Via: SIP/2.0/UDP 31.97.210.100:5060;rport;branch=z9hG4bKPj87a02f38-8870-4ebf-a99b-1990da927e3d
From: <sip:didww_in@31.97.210.100>;tag=06c4f7d9-3b72-47b9-bcc5-de34ff7aa269
To: <sip:46.19.210.14>
Contact: <sip:didww_in@31.97.210.100:5060>
Call-ID: e3c320a5-9043-4ce9-ad34-219d939f6d34
CSeq: 29990 OPTIONS
Max-Forwards: 20
User-Agent: omnileads
Content-Length:  0


<--- Transmitting SIP request (411 bytes) to UDP:46.19.215.14:5060 --->
OPTIONS sip:46.19.215.14:5060 SIP/2.0
Via: SIP/2.0/UDP 31.97.210.100:5060;rport;branch=z9hG4bKPj68cf630b-1f87-4f99-86ff-09abf27dffa1
From: <sip:didww_in@31.97.210.100>;tag=766f6f3b-8e7d-445b-8b80-e0a1ec815499
To: <sip:46.19.215.14>
Contact: <sip:didww_in@31.97.210.100:5060>
Call-ID: 68c4f8ae-05f6-424c-8fac-b755324d276f
CSeq: 22723 OPTIONS
Max-Forwards: 20
User-Agent: omnileads
Content-Length:  0


<--- Received SIP response (404 bytes) from UDP:46.19.212.14:5060 --->
SIP/2.0 200 OK
Via: SIP/2.0/UDP 31.97.210.100:5060;rport=5060;branch=z9hG4bKPje690d4d6-ec4e-47a6-ab60-39424715c1e5;received=31.97.210.100
From: <sip:didww_in@31.97.210.100>;tag=aaaa298a-baae-435a-b358-6f157e804114
To: <sip:46.19.212.14>;tag=3da5f524088720f97d47b11b6f6c07d2.9655ff49
Call-ID: a07fb03a-4d49-40ff-ae35-231663d9acbe
CSeq: 22684 OPTIONS
Server: OOD responder v982
Content-Length: 0


<--- Received SIP response (404 bytes) from UDP:46.19.213.14:5060 --->
SIP/2.0 200 OK
Via: SIP/2.0/UDP 31.97.210.100:5060;rport=5060;branch=z9hG4bKPj843a9766-24c9-43c8-b8db-477c3449f1e2;received=31.97.210.100
From: <sip:didww_in@31.97.210.100>;tag=8460c54b-bc26-48f2-a296-f047a0c40ddb
To: <sip:46.19.213.14>;tag=38a0c2c677151c484275ef4c700e9780.a2511283
Call-ID: 235e57d7-e820-43be-a262-e10a8e870123
CSeq: 10073 OPTIONS
Server: OOD responder v982
Content-Length: 0


<--- Received SIP response (403 bytes) from UDP:46.19.209.14:5060 --->
SIP/2.0 200 OK
Via: SIP/2.0/UDP 31.97.210.100:5060;rport=5060;branch=z9hG4bKPj0c50040b-d0ef-4765-8f9d-261d7e0485a3;received=31.97.210.100
From: <sip:didww_in@31.97.210.100>;tag=b32918f4-91c3-4b5b-b003-02cc6c0f8702
To: <sip:46.19.209.14>;tag=815cbf4cfc3e75322dd43ade78dddabe.acfd2e2c
Call-ID: e868e6d3-3e68-4f1a-8d4c-407192e6d540
CSeq: 4434 OPTIONS
Server: OOD responder v982
Content-Length: 0


<--- Received SIP response (404 bytes) from UDP:46.19.210.14:5060 --->
SIP/2.0 200 OK
Via: SIP/2.0/UDP 31.97.210.100:5060;rport=5060;received=31.97.210.100;branch=z9hG4bKPj87a02f38-8870-4ebf-a99b-1990da927e3d
From: <sip:didww_in@31.97.210.100>;tag=06c4f7d9-3b72-47b9-bcc5-de34ff7aa269
To: <sip:46.19.210.14>;tag=96ef325e4e1162bc586f6ca7aebc6156.ded6bf8e
Call-ID: e3c320a5-9043-4ce9-ad34-219d939f6d34
CSeq: 29990 OPTIONS
Server: OOD responder v982
Content-Length: 0


<--- Received SIP request (608 bytes) from UDP:51.161.137.193:49315 --->
REGISTER sip:31.97.210.100 SIP/2.0
Via: SIP/2.0/UDP 51.161.137.193:49315;branch=z9hG4bK908666681
Max-Forwards: 70
From: <sip:2472@31.97.210.100>;tag=624010458
To: <sip:2472@31.97.210.100>
Call-ID: 213853520-1161802338-1677340342
CSeq: 2 REGISTER
Contact: <sip:2472@51.161.137.193:49315>
Content-Length: 0
Authorization: Digest username="2472",uri="sip:31.97.210.100",algorithm=MD5,realm="asterisk",nonce="1765430752/a28d1c0281b40b1569fb36845d56cec4",response="a38786d5ebb60d7d5c28bc9028e02b30",qop=auth,nc=00000001, cnonce="1524303011",opaque="21d2cdb23021c775"
User-Agent: Avaya IP Phone 1120E


[Dec 10 23:25:52] NOTICE[343]: res_pjsip/pjsip_distributor.c:688 log_failed_request: Request 'REGISTER' from '<sip:2472@31.97.210.100>' failed for '51.161.137.193:49315' (callid: 213853520-1161802338-1677340342) - No matching endpoint found
[Dec 10 23:25:52] NOTICE[343]: res_pjsip/pjsip_distributor.c:688 log_failed_request: Request 'REGISTER' from '<sip:2472@31.97.210.100>' failed for '51.161.137.193:49315' (callid: 213853520-1161802338-1677340342) - Failed to authenticate
<--- Transmitting SIP response (469 bytes) to UDP:51.161.137.193:49315 --->
SIP/2.0 401 Unauthorized
Via: SIP/2.0/UDP 51.161.137.193:49315;rport=49315;received=51.161.137.193;branch=z9hG4bK908666681
Call-ID: 213853520-1161802338-1677340342
From: <sip:2472@31.97.210.100>;tag=624010458
To: <sip:2472@31.97.210.100>;tag=z9hG4bK908666681
CSeq: 2 REGISTER
WWW-Authenticate: Digest realm="asterisk",nonce="1765430752/a28d1c0281b40b1569fb36845d56cec4",opaque="470cae2f053c2176",algorithm=MD5,qop="auth"
Server: omnileads
Content-Length:  0


[Dec 10 23:25:52] SECURITY[73]: res_security_log.c:114 security_event_stasis_cb: SecurityEvent="InvalidAccountID",EventTV="2025-12-10T23:25:52.461-0600",Severity="Error",Service="PJSIP",EventVersion="1",AccountID="2472",SessionID="213853520-1161802338-1677340342",LocalAddress="IPV4/UDP/31.97.210.100/5060",RemoteAddress="IPV4/UDP/51.161.137.193/49315"
[Dec 10 23:25:52] SECURITY[73]: res_security_log.c:114 security_event_stasis_cb: SecurityEvent="ChallengeResponseFailed",EventTV="2025-12-10T23:25:52.461-0600",Severity="Error",Service="PJSIP",EventVersion="1",AccountID="<unknown>",SessionID="213853520-1161802338-1677340342",LocalAddress="IPV4/UDP/31.97.210.100/5060",RemoteAddress="IPV4/UDP/51.161.137.193/49315",Challenge="1765430752/a28d1c0281b40b1569fb36845d56cec4",Response="a38786d5ebb60d7d5c28bc9028e02b30",ExpectedResponse=""
<--- Received SIP response (404 bytes) from UDP:46.19.215.14:5060 --->
SIP/2.0 200 OK
Via: SIP/2.0/UDP 31.97.210.100:5060;rport=5060;branch=z9hG4bKPj68cf630b-1f87-4f99-86ff-09abf27dffa1;received=31.97.210.100
From: <sip:didww_in@31.97.210.100>;tag=766f6f3b-8e7d-445b-8b80-e0a1ec815499
To: <sip:46.19.215.14>;tag=55c2b85e75369b5eabe2298586181ab0.56a49d24
Call-ID: 68c4f8ae-05f6-424c-8fac-b755324d276f
CSeq: 22723 OPTIONS
Server: OOD responder v982
Content-Length: 0


<--- Received SIP response (404 bytes) from UDP:46.19.214.14:5060 --->
SIP/2.0 200 OK
Via: SIP/2.0/UDP 31.97.210.100:5060;rport=5060;branch=z9hG4bKPj2bafbf62-5a2c-4bbd-affc-e96a2f80cef5;received=31.97.210.100
From: <sip:didww_in@31.97.210.100>;tag=0e69cb13-8736-4669-8f27-9fed17e3fca7
To: <sip:46.19.214.14>;tag=bddf0df813859b89a3162cb18023743a.dc2c8e07
Call-ID: 97de4e03-8918-41d5-9cc7-684143046482
CSeq: 58043 OPTIONS
Server: OOD responder v982
Content-Length: 0


<--- Received SIP request (608 bytes) from UDP:51.161.137.193:49315 --->
REGISTER sip:31.97.210.100 SIP/2.0
Via: SIP/2.0/UDP 51.161.137.193:49315;branch=z9hG4bK1716652550
Max-Forwards: 70
From: <sip:2472@31.97.210.100>;tag=624010458
To: <sip:2472@31.97.210.100>
Call-ID: 213853520-1161802338-1677340342
CSeq: 3 REGISTER
Contact: <sip:2472@51.161.137.193:49315>
Content-Length: 0
Authorization: Digest username="2472",uri="sip:31.97.210.100",algorithm=MD5,realm="asterisk",nonce="1765430752/a28d1c0281b40b1569fb36845d56cec4",response="5ef97bfa53f8e41118244d07c0129b84",qop=auth,nc=00000001, cnonce="757874737",opaque="470cae2f053c2176"
User-Agent: Avaya IP Phone 1120E


[Dec 10 23:25:52] NOTICE[343]: res_pjsip/pjsip_distributor.c:688 log_failed_request: Request 'REGISTER' from '<sip:2472@31.97.210.100>' failed for '51.161.137.193:49315' (callid: 213853520-1161802338-1677340342) - No matching endpoint found
[Dec 10 23:25:52] NOTICE[343]: res_pjsip/pjsip_distributor.c:688 log_failed_request: Request 'REGISTER' from '<sip:2472@31.97.210.100>' failed for '51.161.137.193:49315' (callid: 213853520-1161802338-1677340342) - Failed to authenticate
[Dec 10 23:25:52] SECURITY[73]: res_security_log.c:114 security_event_stasis_cb: SecurityEvent="InvalidAccountID",EventTV="2025-12-10T23:25:52.620-0600",Severity="Error",Service="PJSIP",EventVersion="1",AccountID="2472",SessionID="213853520-1161802338-1677340342",LocalAddress="IPV4/UDP/31.97.210.100/5060",RemoteAddress="IPV4/UDP/51.161.137.193/49315"
[Dec 10 23:25:52] SECURITY[73]: res_security_log.c:114 security_event_stasis_cb: SecurityEvent="ChallengeResponseFailed",EventTV="2025-12-10T23:25:52.620-0600",Severity="Error",Service="PJSIP",EventVersion="1",AccountID="<unknown>",SessionID="213853520-1161802338-1677340342",LocalAddress="IPV4/UDP/31.97.210.100/5060",RemoteAddress="IPV4/UDP/51.161.137.193/49315",Challenge="1765430752/a28d1c0281b40b1569fb36845d56cec4",Response="5ef97bfa53f8e41118244d07c0129b84",ExpectedResponse=""
<--- Transmitting SIP response (471 bytes) to UDP:51.161.137.193:49315 --->
SIP/2.0 401 Unauthorized
Via: SIP/2.0/UDP 51.161.137.193:49315;rport=49315;received=51.161.137.193;branch=z9hG4bK1716652550
Call-ID: 213853520-1161802338-1677340342
From: <sip:2472@31.97.210.100>;tag=624010458
To: <sip:2472@31.97.210.100>;tag=z9hG4bK1716652550
CSeq: 3 REGISTER
WWW-Authenticate: Digest realm="asterisk",nonce="1765430752/a28d1c0281b40b1569fb36845d56cec4",opaque="6a90e5cd55e5e1a9",algorithm=MD5,qop="auth"
Server: omnileads
Content-Length:  0


<--- Received SIP request (609 bytes) from UDP:51.161.137.193:49315 --->
REGISTER sip:31.97.210.100 SIP/2.0
Via: SIP/2.0/UDP 51.161.137.193:49315;branch=z9hG4bK1788990963
Max-Forwards: 70
From: <sip:2472@31.97.210.100>;tag=624010458
To: <sip:2472@31.97.210.100>
Call-ID: 213853520-1161802338-1677340342
CSeq: 4 REGISTER
Contact: <sip:2472@51.161.137.193:49315>
Content-Length: 0
Authorization: Digest username="2472",uri="sip:31.97.210.100",algorithm=MD5,realm="asterisk",nonce="1765430752/a28d1c0281b40b1569fb36845d56cec4",response="f437be75fa40033437bf5bbfc0235518",qop=auth,nc=00000001, cnonce="1089908580",opaque="6a90e5cd55e5e1a9"
User-Agent: Avaya IP Phone 1120E


[Dec 10 23:25:52] NOTICE[5876]: res_pjsip/pjsip_distributor.c:688 log_failed_request: Request 'REGISTER' from '<sip:2472@31.97.210.100>' failed for '51.161.137.193:49315' (callid: 213853520-1161802338-1677340342) - No matching endpoint found
[Dec 10 23:25:52] SECURITY[73]: res_security_log.c:114 security_event_stasis_cb: SecurityEvent="InvalidAccountID",EventTV="2025-12-10T23:25:52.805-0600",Severity="Error",Service="PJSIP",EventVersion="1",AccountID="2472",SessionID="213853520-1161802338-1677340342",LocalAddress="IPV4/UDP/31.97.210.100/5060",RemoteAddress="IPV4/UDP/51.161.137.193/49315"
[Dec 10 23:25:52] NOTICE[5876]: res_pjsip/pjsip_distributor.c:688 log_failed_request: Request 'REGISTER' from '<sip:2472@31.97.210.100>' failed for '51.161.137.193:49315' (callid: 213853520-1161802338-1677340342) - Failed to authenticate
[Dec 10 23:25:52] SECURITY[73]: res_security_log.c:114 security_event_stasis_cb: SecurityEvent="ChallengeResponseFailed",EventTV="2025-12-10T23:25:52.806-0600",Severity="Error",Service="PJSIP",EventVersion="1",AccountID="<unknown>",SessionID="213853520-1161802338-1677340342",LocalAddress="IPV4/UDP/31.97.210.100/5060",RemoteAddress="IPV4/UDP/51.161.137.193/49315",Challenge="1765430752/a28d1c0281b40b1569fb36845d56cec4",Response="f437be75fa40033437bf5bbfc0235518",ExpectedResponse=""
<--- Transmitting SIP response (471 bytes) to UDP:51.161.137.193:49315 --->
SIP/2.0 401 Unauthorized
Via: SIP/2.0/UDP 51.161.137.193:49315;rport=49315;received=51.161.137.193;branch=z9hG4bK1788990963
Call-ID: 213853520-1161802338-1677340342
From: <sip:2472@31.97.210.100>;tag=624010458
To: <sip:2472@31.97.210.100>;tag=z9hG4bK1788990963
CSeq: 4 REGISTER
WWW-Authenticate: Digest realm="asterisk",nonce="1765430752/a28d1c0281b40b1569fb36845d56cec4",opaque="7e1c2b223c9a23fd",algorithm=MD5,qop="auth"
Server: omnileads
Content-Length:  0


<--- Received SIP request (477 bytes) from UDP:46.19.212.54:5060 --->
OPTIONS sip:s@31.97.210.100:5060 SIP/2.0
Via: SIP/2.0/UDP 46.19.212.54;branch=z9hG4bKd03d.349324a7d0bbc79773edb8eb9fc26f93.0
Via: SIP/2.0/UDP 46.19.212.55;received=46.19.212.55;branch=z9hG4bKfkcWManG;rport=5060
From: sip:s@31.97.210.100:5060;tag=sip_registrar
To: sip:s@31.97.210.100:5060
CSeq: 10 OPTIONS
Call-ID: 15-669CB128-693A55E10005C419-312FB6C0
Max-Forwards: 69
User-Agent: DIDWW Y SBC node
Contact: <sip:46.19.212.55:5060;transport=udp>
Content-Length: 0


<--- Transmitting SIP response (951 bytes) to UDP:46.19.212.54:5060 --->
SIP/2.0 404 Not Found
Via: SIP/2.0/UDP 46.19.212.54;rport=5060;received=46.19.212.54;branch=z9hG4bKd03d.349324a7d0bbc79773edb8eb9fc26f93.0
Via: SIP/2.0/UDP 46.19.212.55;rport=5060;received=46.19.212.55;branch=z9hG4bKfkcWManG
Call-ID: 15-669CB128-693A55E10005C419-312FB6C0
From: <sip:s@31.97.210.100>;tag=sip_registrar
To: <sip:s@31.97.210.100>;tag=z9hG4bKd03d.349324a7d0bbc79773edb8eb9fc26f93.0
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
Via: SIP/2.0/UDP 46.19.214.54;branch=z9hG4bK00da.3f789ca949e02febc61cc5adfc93c8b8.0
Via: SIP/2.0/UDP 46.19.214.56;received=46.19.214.56;branch=z9hG4bKctQUTaIS;rport=5060
From: sip:s@31.97.210.100:5060;tag=sip_registrar
To: sip:s@31.97.210.100:5060
CSeq: 10 OPTIONS
Call-ID: 20-7E8309C6-693A55E2000356EA-D46FC6C0
Max-Forwards: 69
User-Agent: DIDWW Y SBC node
Contact: <sip:46.19.214.56:5060;transport=udp>
Content-Length: 0


<--- Transmitting SIP response (951 bytes) to UDP:46.19.214.54:5060 --->
SIP/2.0 404 Not Found
Via: SIP/2.0/UDP 46.19.214.54;rport=5060;received=46.19.214.54;branch=z9hG4bK00da.3f789ca949e02febc61cc5adfc93c8b8.0
Via: SIP/2.0/UDP 46.19.214.56;rport=5060;received=46.19.214.56;branch=z9hG4bKctQUTaIS
Call-ID: 20-7E8309C6-693A55E2000356EA-D46FC6C0
From: <sip:s@31.97.210.100>;tag=sip_registrar
To: <sip:s@31.97.210.100>;tag=z9hG4bK00da.3f789ca949e02febc61cc5adfc93c8b8.0
CSeq: 10 OPTIONS
Accept: application/xpidf+xml, application/cpim-pidf+xml, application/dialog-info+xml, application/simple-message-summary, application/pidf+xml, application/pidf+xml, application/dialog-info+xml, application/simple-message-summary, application/sdp, message/sipfrag;version=2.0
Allow: OPTIONS, REGISTER, SUBSCRIBE, NOTIFY, PUBLISH, INVITE, ACK, BYE, CANCEL, UPDATE, PRACK, INFO, MESSAGE, REFER
Supported: 100rel, timer, replaces, norefersub
Accept-Encoding: identity
Accept-Language: en
Server: omnileads
Content-Length:  0


  == Manager 'omnileads' logged on from 31.97.210.100
[Dec 10 23:25:57] SECURITY[73]: res_security_log.c:114 security_event_stasis_cb: SecurityEvent="SuccessfulAuth",EventTV="2025-12-10T23:25:57.231-0600",Severity="Informational",Service="AMI",EventVersion="1",AccountID="omnileads",SessionID="0x7f53c01ce330",LocalAddress="IPV4/TCP/31.97.210.100/5038",RemoteAddress="IPV4/TCP/31.97.210.100/40852",UsingPassword="0",SessionTV="2025-12-10T23:25:57.231-0600"
  == Manager 'omnileads' logged off from 31.97.210.100
<--- Received SIP request (477 bytes) from UDP:46.19.213.54:5060 --->
OPTIONS sip:s@31.97.210.100:5060 SIP/2.0
Via: SIP/2.0/UDP 46.19.213.54;branch=z9hG4bKaaf6.fa464d5d6e186ebe8f060984ecc66d4e.0
Via: SIP/2.0/UDP 46.19.213.55;received=46.19.213.55;branch=z9hG4bKKCOtYaKn;rport=5060
From: sip:s@31.97.210.100:5060;tag=sip_registrar
To: sip:s@31.97.210.100:5060
CSeq: 10 OPTIONS
Call-ID: 17-00C74BC7-693A55E9000B85CB-F29FC6C0
Max-Forwards: 69
User-Agent: DIDWW Y SBC node
Contact: <sip:46.19.213.55:5060;transport=udp>
Content-Length: 0


<--- Transmitting SIP response (951 bytes) to UDP:46.19.213.54:5060 --->
SIP/2.0 404 Not Found
Via: SIP/2.0/UDP 46.19.213.54;rport=5060;received=46.19.213.54;branch=z9hG4bKaaf6.fa464d5d6e186ebe8f060984ecc66d4e.0
Via: SIP/2.0/UDP 46.19.213.55;rport=5060;received=46.19.213.55;branch=z9hG4bKKCOtYaKn
Call-ID: 17-00C74BC7-693A55E9000B85CB-F29FC6C0
From: <sip:s@31.97.210.100>;tag=sip_registrar
To: <sip:s@31.97.210.100>;tag=z9hG4bKaaf6.fa464d5d6e186ebe8f060984ecc66d4e.0
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
Via: SIP/2.0/UDP 185.238.173.44;branch=z9hG4bK8368.19a7ba3f3e8e111b5b1c276a97436bb1.0
Via: SIP/2.0/UDP 185.238.173.55;received=185.238.173.55;branch=z9hG4bKaBGHFaL.;rport=5060
From: sip:s@31.97.210.100:5060;tag=sip_registrar
To: sip:s@31.97.210.100:5060
CSeq: 10 OPTIONS
Call-ID: 23-00642132-693A55EB0005DA5F-76BFE6C0
Max-Forwards: 69
User-Agent: DIDWW Y SBC node
Contact: <sip:185.238.173.55:5060;transport=udp>
Content-Length: 0


<--- Transmitting SIP response (959 bytes) to UDP:185.238.173.44:5060 --->
SIP/2.0 404 Not Found
Via: SIP/2.0/UDP 185.238.173.44;rport=5060;received=185.238.173.44;branch=z9hG4bK8368.19a7ba3f3e8e111b5b1c276a97436bb1.0
Via: SIP/2.0/UDP 185.238.173.55;rport=5060;received=185.238.173.55;branch=z9hG4bKaBGHFaL.
Call-ID: 23-00642132-693A55EB0005DA5F-76BFE6C0
From: <sip:s@31.97.210.100>;tag=sip_registrar
To: <sip:s@31.97.210.100>;tag=z9hG4bK8368.19a7ba3f3e8e111b5b1c276a97436bb1.0
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
Via: SIP/2.0/UDP 46.19.213.54;branch=z9hG4bK7e63.90510075b09b93b39b9996adad1870d0.0
Via: SIP/2.0/UDP 46.19.213.56;received=46.19.213.56;branch=z9hG4bKccdmeapm;rport=5060
From: sip:s@31.97.210.100:5060;tag=sip_registrar
To: sip:s@31.97.210.100:5060
CSeq: 10 OPTIONS
Call-ID: 18-1F94F0C2-693A55EB0006F97F-A47FB6C0
Max-Forwards: 69
User-Agent: DIDWW Y SBC node
Contact: <sip:46.19.213.56:5060;transport=udp>
Content-Length: 0


<--- Transmitting SIP response (951 bytes) to UDP:46.19.213.54:5060 --->
SIP/2.0 404 Not Found
Via: SIP/2.0/UDP 46.19.213.54;rport=5060;received=46.19.213.54;branch=z9hG4bK7e63.90510075b09b93b39b9996adad1870d0.0
Via: SIP/2.0/UDP 46.19.213.56;rport=5060;received=46.19.213.56;branch=z9hG4bKccdmeapm
Call-ID: 18-1F94F0C2-693A55EB0006F97F-A47FB6C0
From: <sip:s@31.97.210.100>;tag=sip_registrar
To: <sip:s@31.97.210.100>;tag=z9hG4bK7e63.90510075b09b93b39b9996adad1870d0.0
CSeq: 10 OPTIONS
Accept: application/xpidf+xml, application/cpim-pidf+xml, application/dialog-info+xml, application/simple-message-summary, application/pidf+xml, application/pidf+xml, application/dialog-info+xml, application/simple-message-summary, application/sdp, message/sipfrag;version=2.0
Allow: OPTIONS, REGISTER, SUBSCRIBE, NOTIFY, PUBLISH, INVITE, ACK, BYE, CANCEL, UPDATE, PRACK, INFO, MESSAGE, REFER
Supported: 100rel, timer, replaces, norefersub
Accept-Encoding: identity
Accept-Language: en
Server: omnileads
Content-Length:  0


  == Manager 'omnileads' logged on from 31.97.210.100
[Dec 10 23:26:04] SECURITY[73]: res_security_log.c:114 security_event_stasis_cb: SecurityEvent="SuccessfulAuth",EventTV="2025-12-10T23:26:04.189-0600",Severity="Informational",Service="AMI",EventVersion="1",AccountID="omnileads",SessionID="0x7f53c41194c0",LocalAddress="IPV4/TCP/31.97.210.100/5038",RemoteAddress="IPV4/TCP/31.97.210.100/40862",UsingPassword="0",SessionTV="2025-12-10T23:26:04.189-0600"
  == Manager 'omnileads' logged off from 31.97.210.100
<--- Received SIP request (477 bytes) from UDP:46.19.210.19:5060 --->
OPTIONS sip:s@31.97.210.100:5060 SIP/2.0
Via: SIP/2.0/UDP 46.19.210.19;branch=z9hG4bK6128.a524d285ec4787c25bbefd28fa311d5b.0
Via: SIP/2.0/UDP 46.19.210.21;received=46.19.210.21;branch=z9hG4bKuACPmayT;rport=5060
From: sip:s@31.97.210.100:5060;tag=sip_registrar
To: sip:s@31.97.210.100:5060
CSeq: 10 OPTIONS
Call-ID: 12-2E10BA6E-693A55EE00016CE1-891FA6C0
Max-Forwards: 69
User-Agent: DIDWW Y SBC node
Contact: <sip:46.19.210.21:5060;transport=udp>
Content-Length: 0


<--- Transmitting SIP response (951 bytes) to UDP:46.19.210.19:5060 --->
SIP/2.0 404 Not Found
Via: SIP/2.0/UDP 46.19.210.19;rport=5060;received=46.19.210.19;branch=z9hG4bK6128.a524d285ec4787c25bbefd28fa311d5b.0
Via: SIP/2.0/UDP 46.19.210.21;rport=5060;received=46.19.210.21;branch=z9hG4bKuACPmayT
Call-ID: 12-2E10BA6E-693A55EE00016CE1-891FA6C0
From: <sip:s@31.97.210.100>;tag=sip_registrar
To: <sip:s@31.97.210.100>;tag=z9hG4bK6128.a524d285ec4787c25bbefd28fa311d5b.0
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
Via: SIP/2.0/UDP 46.19.210.19;branch=z9hG4bKe85.d8821d00deb49735387e5533735e0313.0
Via: SIP/2.0/UDP 46.19.210.17;received=46.19.210.17;branch=z9hG4bKkzLPWasF;rport=5060
From: sip:s@31.97.210.100:5060;tag=sip_registrar
To: sip:s@31.97.210.100:5060
CSeq: 10 OPTIONS
Call-ID: 13-1F643575-693A55EE000266BB-80AFC6C0
Max-Forwards: 69
User-Agent: DIDWW Y SBC node
Contact: <sip:46.19.210.17:5060;transport=udp>
Content-Length: 0


<--- Transmitting SIP response (949 bytes) to UDP:46.19.210.19:5060 --->
SIP/2.0 404 Not Found
Via: SIP/2.0/UDP 46.19.210.19;rport=5060;received=46.19.210.19;branch=z9hG4bKe85.d8821d00deb49735387e5533735e0313.0
Via: SIP/2.0/UDP 46.19.210.17;rport=5060;received=46.19.210.17;branch=z9hG4bKkzLPWasF
Call-ID: 13-1F643575-693A55EE000266BB-80AFC6C0
From: <sip:s@31.97.210.100>;tag=sip_registrar
To: <sip:s@31.97.210.100>;tag=z9hG4bKe85.d8821d00deb49735387e5533735e0313.0
CSeq: 10 OPTIONS
Accept: application/xpidf+xml, application/cpim-pidf+xml, application/dialog-info+xml, application/simple-message-summary, application/pidf+xml, application/pidf+xml, application/dialog-info+xml, application/simple-message-summary, application/sdp, message/sipfrag;version=2.0
Allow: OPTIONS, REGISTER, SUBSCRIBE, NOTIFY, PUBLISH, INVITE, ACK, BYE, CANCEL, UPDATE, PRACK, INFO, MESSAGE, REFER
Supported: 100rel, timer, replaces, norefersub
Accept-Encoding: identity
Accept-Language: en
Server: omnileads
Content-Length:  0


<--- Transmitting SIP request (435 bytes) to UDP:190.92.90.136:5060 --->
OPTIONS sip:xpb.cablecolor.hn:5060 SIP/2.0
Via: SIP/2.0/UDP 31.97.210.100:5060;rport;branch=z9hG4bKPj6927f500-d665-4850-88ef-99b88e798cd2
From: <sip:metrocom_in_aux@31.97.210.100>;tag=2bc849d7-6a1e-4fed-b9d7-95d8a9519868
To: <sip:xpb.cablecolor.hn>
Contact: <sip:metrocom_in_aux@31.97.210.100:5060>
Call-ID: 2d62c804-4b7a-4a22-ad82-f5be4331e18d
CSeq: 11105 OPTIONS
Max-Forwards: 20
User-Agent: omnileads
Content-Length:  0


<--- Received SIP response (386 bytes) from UDP:190.92.90.136:5060 --->
SIP/2.0 404 Not Found
From: <sip:metrocom_in_aux@31.97.210.100>;tag=2bc849d7-6a1e-4fed-b9d7-95d8a9519868
To: <sip:xpb.cablecolor.hn>;tag=4bbca5dd-61905ba2-425008-7fdf38142fa8-100007f-13c4-7217
Call-ID: 2d62c804-4b7a-4a22-ad82-f5be4331e18d
CSeq: 11105 OPTIONS
Via: SIP/2.0/UDP 31.97.210.100:5060;rport=5060;branch=z9hG4bKPj6927f500-d665-4850-88ef-99b88e798cd2
Content-Length: 0


<--- Received SIP request (477 bytes) from UDP:46.19.209.44:5060 --->
OPTIONS sip:s@31.97.210.100:5060 SIP/2.0
Via: SIP/2.0/UDP 46.19.209.44;branch=z9hG4bK7d16.189371924ccd11bfa33e7b55a8e990e5.0
Via: SIP/2.0/UDP 46.19.209.45;received=46.19.209.45;branch=z9hG4bKsM1GpaeN;rport=5060
From: sip:s@31.97.210.100:5060;tag=sip_registrar
To: sip:s@31.97.210.100:5060
CSeq: 10 OPTIONS
Call-ID: 11-56E08A73-693A55EF000EF748-AEBFB6C0
Max-Forwards: 69
User-Agent: DIDWW Y SBC node
Contact: <sip:46.19.209.45:5060;transport=udp>
Content-Length: 0


<--- Transmitting SIP response (951 bytes) to UDP:46.19.209.44:5060 --->
SIP/2.0 404 Not Found
Via: SIP/2.0/UDP 46.19.209.44;rport=5060;received=46.19.209.44;branch=z9hG4bK7d16.189371924ccd11bfa33e7b55a8e990e5.0
Via: SIP/2.0/UDP 46.19.209.45;rport=5060;received=46.19.209.45;branch=z9hG4bKsM1GpaeN
Call-ID: 11-56E08A73-693A55EF000EF748-AEBFB6C0
From: <sip:s@31.97.210.100>;tag=sip_registrar
To: <sip:s@31.97.210.100>;tag=z9hG4bK7d16.189371924ccd11bfa33e7b55a8e990e5.0
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
Via: SIP/2.0/UDP 46.19.214.54;branch=z9hG4bK8446.49338258b8d70585e9581562eb965aea.0
Via: SIP/2.0/UDP 46.19.214.55;received=46.19.214.55;branch=z9hG4bKOH4FLa2Q;rport=5060
From: sip:s@31.97.210.100:5060;tag=sip_registrar
To: sip:s@31.97.210.100:5060
CSeq: 10 OPTIONS
Call-ID: 19-08C69CAF-693A55F1000CC3AF-18AFA6C0
Max-Forwards: 69
User-Agent: DIDWW Y SBC node
Contact: <sip:46.19.214.55:5060;transport=udp>
Content-Length: 0


<--- Transmitting SIP response (951 bytes) to UDP:46.19.214.54:5060 --->
SIP/2.0 404 Not Found
Via: SIP/2.0/UDP 46.19.214.54;rport=5060;received=46.19.214.54;branch=z9hG4bK8446.49338258b8d70585e9581562eb965aea.0
Via: SIP/2.0/UDP 46.19.214.55;rport=5060;received=46.19.214.55;branch=z9hG4bKOH4FLa2Q
Call-ID: 19-08C69CAF-693A55F1000CC3AF-18AFA6C0
From: <sip:s@31.97.210.100>;tag=sip_registrar
To: <sip:s@31.97.210.100>;tag=z9hG4bK8446.49338258b8d70585e9581562eb965aea.0
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
Via: SIP/2.0/UDP 185.238.173.44;branch=z9hG4bK7c7d.5d40c08a2e992ac0a3e8531e7ad6fcb5.0
Via: SIP/2.0/UDP 185.238.173.56;received=185.238.173.56;branch=z9hG4bKpSWGRahX;rport=5060
From: sip:s@31.97.210.100:5060;tag=sip_registrar
To: sip:s@31.97.210.100:5060
CSeq: 10 OPTIONS
Call-ID: 24-32F5BA75-693A55F20002F8E3-02BFE6C0
Max-Forwards: 69
User-Agent: DIDWW Y SBC node
Contact: <sip:185.238.173.56:5060;transport=udp>
Content-Length: 0


<--- Transmitting SIP response (959 bytes) to UDP:185.238.173.44:5060 --->
SIP/2.0 404 Not Found
Via: SIP/2.0/UDP 185.238.173.44;rport=5060;received=185.238.173.44;branch=z9hG4bK7c7d.5d40c08a2e992ac0a3e8531e7ad6fcb5.0
Via: SIP/2.0/UDP 185.238.173.56;rport=5060;received=185.238.173.56;branch=z9hG4bKpSWGRahX
Call-ID: 24-32F5BA75-693A55F20002F8E3-02BFE6C0
From: <sip:s@31.97.210.100>;tag=sip_registrar
To: <sip:s@31.97.210.100>;tag=z9hG4bK7c7d.5d40c08a2e992ac0a3e8531e7ad6fcb5.0
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
Via: SIP/2.0/UDP 46.19.212.54;branch=z9hG4bK0369.570e0d325bd0916a809be37c6698cb37.0
Via: SIP/2.0/UDP 46.19.212.56;received=46.19.212.56;branch=z9hG4bKI6gwGaWA;rport=5060
From: sip:s@31.97.210.100:5060;tag=sip_registrar
To: sip:s@31.97.210.100:5060
CSeq: 10 OPTIONS
Call-ID: 16-58432076-693A55F700003F7E-F33FD6C0
Max-Forwards: 69
User-Agent: DIDWW Y SBC node
Contact: <sip:46.19.212.56:5060;transport=udp>
Content-Length: 0


<--- Transmitting SIP response (951 bytes) to UDP:46.19.212.54:5060 --->
SIP/2.0 404 Not Found
Via: SIP/2.0/UDP 46.19.212.54;rport=5060;received=46.19.212.54;branch=z9hG4bK0369.570e0d325bd0916a809be37c6698cb37.0
Via: SIP/2.0/UDP 46.19.212.56;rport=5060;received=46.19.212.56;branch=z9hG4bKI6gwGaWA
Call-ID: 16-58432076-693A55F700003F7E-F33FD6C0
From: <sip:s@31.97.210.100>;tag=sip_registrar
To: <sip:s@31.97.210.100>;tag=z9hG4bK0369.570e0d325bd0916a809be37c6698cb37.0
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