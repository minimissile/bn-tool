import axios from "axios";

const fetch = async () => {
    const res = await axios.post('https://www.binance.com/bapi/growth/v1/friendly/growth-paas/resource/summary/list', {
        "resourceId": 29545,
        "leaderboardType": "USER",
        "pageIndex": 1,
        "pageSize": 5
    }, {
        headers: {
            "cookie": "bnc-uuid=c6c8b67c-abec-46a8-aa54-596bff23ae0b; BNC_FV_KEY=33c3ce2ba3d7afaf8f33e9d125b8586e4e37b92d; lang=zh-CN; se_gd=QMOUxTQ5SBIDwITAEVRIgZZDwCwkMBWWlBQ9QW091BVVACVNWV1Q1; se_gsd=cyc1GjtjJislMFcwNxw3My4qBwoVAwsBWFRAVFxaVlBTN1NT1; ref=J8ED3489; BNC-Location=CN; userPreferredCurrency=CNY_USD; changeBasisTimeZone=; OptanonAlertBoxClosed=2025-09-18T12:45:41.780Z; _gcl_au=1.1.802118290.1758290817; _gcl_aw=GCL.1759568313.CjwKCAjwi4PHBhA-EiwAnjTHuSx6wCbve4x__DTW1K8VMXpqLSc-2nPm349SjJ9Zp_GKJj2QHN_xJRoCDUsQAvD_BwE; _gac_UA-162512367-1=1.1759568329.CjwKCAjwi4PHBhA-EiwAnjTHuSx6wCbve4x__DTW1K8VMXpqLSc-2nPm349SjJ9Zp_GKJj2QHN_xJRoCDUsQAvD_BwE; futures-layout=pro; g_state={\"i_l\":0,\"i_ll\":1760854404828,\"i_b\":\"OVvc+J/HYwmntJjqIWVnIVe8snff7GyqKrqIToPFuPs\"}; _uetvid=e9483cd0956111f0923cbbfaf2cf987b; _gid=GA1.2.1844451816.1761305888; se_sd=xUEGhXlgOTOVBQb0ZDFAgZZHBAQoDETUlsIJRWkNFBXUwVVNWVxV1; r20t=web.80CC5C36E6B168E5D51A002037F864A2; r30t=1; cr00=2CF85E14B05AC29D717F7EB9779E9F25; d1og=web.50200949.F55B9DC3E6726BD6A881737F74AD0CA7; r2o1=web.50200949.313002E4951E3C22D9A4CDDB3CCCA5F0; f30l=web.50200949.A697FE8E9B435BBD10E1FAE7D76DB38F; currentAccount=; logined=y; p20t=web.50200949.965295A8A1A7787EC97A3711B3D0F5B2; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%2250200949%22%2C%22first_id%22%3A%22197ba656495145b-05e6815e9aa74bc-18525636-1892970-197ba6564961800%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%2C%22%24latest_referrer%22%3A%22%22%2C%22aws_waf_referrer%22%3A%22%7B%5C%22referrer%5C%22%3A%5C%22%5C%22%7D%22%7D%2C%22identities%22%3A%22eyIkaWRlbnRpdHlfY29va2llX2lkIjoiMTk3YmE2NTY0OTUxNDViLTA1ZTY4MTVlOWFhNzRiYy0xODUyNTYzNi0xODkyOTcwLTE5N2JhNjU2NDk2MTgwMCIsIiRpZGVudGl0eV9sb2dpbl9pZCI6IjUwMjAwOTQ5In0%3D%22%2C%22history_login_id%22%3A%7B%22name%22%3A%22%24identity_login_id%22%2C%22value%22%3A%2250200949%22%7D%2C%22%24device_id%22%3A%22198ca51d603b59-066947914ffee04-16525636-1342080-198ca51d60431ac%22%7D; aws-waf-token=f7a941d7-3b96-4dce-abee-2dd9f29b50ad:AQoAclxSQgcNAAAA:sxkiUAG3NWJKCGGiyiGSSi9Owqj2wY98QENGm1wsXAdTeqVjRqBjtA6zlaNphaGwHaENJZeo/f+/itDXa4VCkYNGbDdDuF3L2eXqJT/GU6BsH2XP4jJ+T+1YOskiIoWMuwIp958gtgDL/pimGYmH+jhdOf4Of/At+yDEdmUioyvNYAW1d69WX9Of4Bzi9Zx2s2A=; BNC_FV_KEY_T=101-y0D08lt5a2MC%2FTzFa%2FgTpL15js2zpMKJOj36b18VI%2BgLTt3SCDC1pVFccgQSNKpqeFaIyvJ3CtjsOIQAGU5v%2Bw%3D%3D-WTbfnV4SCWo3%2FEvZcIVeMw%3D%3D-f7; BNC_FV_KEY_EXPIRE=1761380898037; _ga=GA1.1.2142608197.1755743491; _ga_3WP50LGEEC=GS2.1.s1761359298$o40$g1$t1761361947$j60$l0$h0; theme=dark; OptanonConsent=isGpcEnabled=0&datestamp=Sat+Oct+25+2025+11%3A12%3A35+GMT%2B0800+(%E4%B8%AD%E5%9B%BD%E6%A0%87%E5%87%86%E6%97%B6%E9%97%B4)&version=202506.1.0&browserGpcFlag=0&isIABGlobal=false&hosts=&consentId=b9eefed3-42f7-4581-a398-d3254f8e9369&interactionCount=2&isAnonUser=1&landingPath=NotLandingPage&groups=C0001%3A1%2CC0003%3A1%2CC0004%3A1%2CC0002%3A1&AwaitingReconsent=false&intType=1&geolocation=HK%3B",
            "bnc-uuid": "c6c8b67c-abec-46a8-aa54-596bff23ae0b",
            "csrftoken": "aaad143aa30f957c8ac45310b0865d0e",
            "x-trace-id": "f14b7b6c-0fdc-4581-9f52-ed008fc6d96b",
            "x-ui-request-trace": "f14b7b6c-0fdc-4581-9f52-ed008fc6d96b",
            "fvideo-id": "33c3ce2ba3d7afaf8f33e9d125b8586e4e37b92d",
            "fvideo-token": "oVUXjjalPjQXKY+IGMRqxaTNSRtCOfgNphqRgpHC3vPVzr0WGNWdlwFKcfkyqcxQ+rqsDFh3Eh6itkJdABhf1CbfFw1HJRl3A+vh49pbBOUrRuWrgjLjeN0ZaUQGt14RYYaJhUEGBT1+8b3TOUY0lErtQ4fDHg/0V7rDdPHyAXbeS2sMLMe4KvL/43Ucz64Hc=3c",
            "device-info": "eyJzY3JlZW5fcmVzb2x1dGlvbiI6IjE5MjAsMTA4MCIsImF2YWlsYWJsZV9zY3JlZW5fcmVzb2x1dGlvbiI6IjE5MjAsMTA1NSIsInN5c3RlbV92ZXJzaW9uIjoibWFjT1MgMTAuMTUuNyIsImJyYW5kX21vZGVsIjoiZGVza3RvcCBBcHBsZSBNYWNpbnRvc2ggIiwic3lzdGVtX2xhbmciOiJ6aC1DTiIsInRpbWV6b25lIjoiR01UKzA4OjAwIiwidGltZXpvbmVPZmZzZXQiOi00ODAsInVzZXJfYWdlbnQiOiJNb3ppbGxhLzUuMCAoTWFjaW50b3NoOyBJbnRlbCBNYWMgT1MgWCAxMF8xNV83KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvMTQxLjAuMC4wIFNhZmFyaS81MzcuMzYiLCJsaXN0X3BsdWdpbiI6IlBERiBWaWV3ZXIsQ2hyb21lIFBERiBWaWV3ZXIsQ2hyb21pdW0gUERGIFZpZXdlcixNaWNyb3NvZnQgRWRnZSBQREYgVmlld2VyLFdlYktpdCBidWlsdC1pbiBQREYiLCJjYW52YXNfY29kZSI6IjU1ZDUxMDhjIiwid2ViZ2xfdmVuZG9yIjoiR29vZ2xlIEluYy4gKEFwcGxlKSIsIndlYmdsX3JlbmRlcmVyIjoiQU5HTEUgKEFwcGxlLCBBTkdMRSBNZXRhbCBSZW5kZXJlcjogQXBwbGUgTTMsIFVuc3BlY2lmaWVkIFZlcnNpb24pIiwiYXVkaW8iOiIxMjQuMDQzNDgxNTU4NzY1MDUiLCJwbGF0Zm9ybSI6Ik1hY0ludGVsIiwid2ViX3RpbWV6b25lIjoiQXNpYS9TaGFuZ2hhaSIsImRldmljZV9uYW1lIjoiQ2hyb21lIFYxNDEuMC4wLjAgKG1hY09TKSIsImZpbmdlcnByaW50IjoiMzAyM2U2OGYyMDBhNDk3MDM2MjU5N2JlOWFjZDQ3ZmMiLCJkZXZpY2VfaWQiOiIiLCJyZWxhdGVkX2RldmljZV9pZHMiOiIifQ=="


        }
    })
    console.log('res', res.data)
}


const main = () => {
    fetch()
}

main()