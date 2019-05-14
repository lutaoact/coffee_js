client和server的options中的ca配置项表示可信的CA机构证书列表，只有这些CA机构签发的证书被认为是可信的。如果提供该配置，表示无视系统中的原有可信项，采用由程序提供的列表。

requestCert若为true，表示开启tls双向认证，客户端同样必须提供其证书，如果服务器端配置了ca，那么客户端提供的证书只能是该ca签发的证书

curl https://server.lutao.me:8000
# 因为服务器端使用自签证书，所以客户端会认为证书不可信，两种方法解决：1 使用-k选项跳过验证 2 手动提供CA机构证书

curl -k https://server.lutao.me:8000
curl --cacert ca.crt https://server.lutao.me:8000
