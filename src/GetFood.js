const uri = 'https://www.foodrepo.org/api/v3/products/971'
let h = new Headers({
  "access-control-allow-origin": "*",
  "access-control-request-method": "*",
  "cache-control": "max-age=0, private, must-revalidate",
  "connection": "keep-alive",
  "content-encoding": "gzip",
  "content-type": "application/json; charset=utf-8",
  "date": "Wed, 16 Jun 2021 16:44:10 GMT",
  "etag": "W/\"af23dd7d3d927a18cbf3d4c1b6a25e8b\"",
  "referrer-policy": "strict-origin-when-cross-origin",
  "server": "Cowboy",
  "strict-transport-security": "max-age=31536000; includeSubDomains",
  "transfer-encoding": "chunked",
  "vary": "Origin,Accept-Encoding",
  "via": "1.1 vegur",
  "x-content-type-options": "nosniff",
  "x-download-options": "noopen",
  "x-frame-options": "SAMEORIGIN",
  "x-permitted-cross-domain-policies": "none",
  "x-request-id": "24e2a393-64a7-4dcd-83e7-b1d984405751",
  "x-runtime": "0.040241",
  "x-xss-protection": "1; mode=block"
})
h.append('Authorization', 'Token token=d0651219c21988e3ea26e91d79a5c195')
let req = new Request(uri, {
    method: 'GET',
    headers: h,
    mode:'cors'
})

export const foodData = () => fetch(req)
    .then((response) => {
        if (response.ok) {
        return response.json()
        } else {
            throw new Error('Bad http')
    }
    }).catch(err => {
    console.log('Err',err.message)
})

