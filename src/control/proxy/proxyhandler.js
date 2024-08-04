let proxies = [];
let proxyusage = {};

document.getElementsByName('proxy-source').forEach((e) => {
    e.addEventListener('change', () => {
        if (document.getElementById('use-proxy-file').checked) {
            document.getElementById('proxy-file').addEventListener('change', (event) => {
                console.log('change')
                const file = event.target.files[0]
                const reader = new FileReader()
                reader.onload = function(e) {
                    const lines = e.target.result.split('\n').filter(line => line.trim() !== '')
                    proxies = lines.map(line => {
                        const [ip, port] = line.split(':')
                        return { ip: ip.trim(), port: port.trim() }
                    });
                
                    proxies.forEach(proxy => {
                        const proxykey = `${proxy.ip}:${proxy.port}`
                        proxyusage[proxykey] = 0
                    });
                
                    console.log('Proxies loaded:', proxies)
                };     
                reader.readAsText(file)
            });
        } else if (document.getElementById('use-proxy-page').checked) {
            document.getElementById('proxy-page-apply').addEventListener('click', () => {
                const proxytext = document.getElementById('proxy-page').value
                const lines = proxytext.split('\n').filter(line => line.trim() !== '')
                proxies = lines.map(line => {
                    const [ip, port] = line.split(':')
                    return { ip: ip.trim(), port: port.trim() }
                });
                
                proxies.forEach(proxy => {
                    const proxykey = `${proxy.ip}:${proxy.port}`
                    proxyusage[proxykey] = 0
                });
                
                console.log('Proxies loaded:', proxies);
            })
        }
    })
})


function getrandomproxy() {
  if (proxies.length === 0) {
    throw new Error('No more proxies available')
  }

  const randomproxyindex = Math.floor(Math.random() * proxies.length)
  const proxy = proxies[randomproxyindex]
  const proxykey = `${proxy.ip}:${proxy.port}`

  proxyusage[proxykey]++
  if (proxyusage[proxykey] >= 1) {
    proxies.splice(randomproxyindex, 1)
  }

  return proxy;
}