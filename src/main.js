const $siteList = $('.siteList')
//操作siteList元素
const $lastLi = $siteList.find('li.last')
//操作siteList元素里类名为last的li元素
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [{
    logo: 'a./images/bilibili.png', logoType: 'image', url: 'bilibili.com'
},
{
    logo: './images/bilibili.png', logoType: 'image', url: 'bilibili.com'
},
{
    logo: './images/bilibili.png', logoType: 'image', url: 'bilibili.com'
},
{
    logo: './images/bilibili.png', logoType: 'image', url: 'bilibili.com'
},
]
console.log(hashMap)

//将数据以哈希表组成的数组存入hashmap中
const simplifyUrl = (url) => {
    return url.replace('https://', '').replace('http://', '').replace('www', '').replace(/\/.*/, '')
    //正则 删除/后面的内容
}
const render = () => {
    $siteList.find('li:not(.last)').remove()
    //删除除最后一个节点外的节点
    hashMap.forEach((node, index) => {
        const $li = $(` <li class="site">
        <div class="logo">${node.url[0]}</div>
         <h3>${simplifyUrl(node.url)}</h3>
         <div class="close"><svg class="icon iconstyle" >
         <use xlink:href="#icon-guanbi"></use>
       </svg></div>
       </li>`).insertBefore($lastLi)
        $li.on('click', () => {
            window.open(node.url)
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation() // 阻止冒泡
            hashMap.splice(index, 1)
            render()
        })
    })
}
render()

// 遍历数据
$('.addButton').on('click', () => {
    let url = window.prompt('请问，你要添加的网址是啥')
    if (url.indexOf('http') !== 0) {
        url = 'https://' + url
    }

    hashMap.push({ logo: simplifyUrl(url)[0], logoType: "image", url: url })
    render()
})
window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
}
$(document).on('keypress', (e) => {
    const { key } = e
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
        }
    }
})
