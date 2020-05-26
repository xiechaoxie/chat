const container = document.querySelector('.container')
const btn = document.querySelector('button')
const stin = document.querySelector('input')
const ul = document.querySelector('ul')
const h = document.documentElement.clientHeight
container.style.height = h - 100 + 'px'



// 获取名字的弹框
const nameBox = document.querySelector('.name-box')
const cancel = document.querySelector('#cancel')
const confirm = document.querySelector('#confirm')
const user = document.querySelector('#username')

function closeNameBox() {
    nameBox.style.display = 'none'
}

cancel.onclick = closeNameBox

confirm.onclick = function() {
    window.userName = user.value
        // 第一次连接好服务器之后的发送
    client.onopen = function() {
        client.send(`${window.userName}进来直播间`)
    }


    closeNameBox()
}




// 连接服务器
const port = 9000
const host = '10.31.160.22'
const serverURL = `ws://${host}:${port}`
const client = new WebSocket(serverURL)
let str = ''


// 获取服务端的信息，然后展示到界面上
client.onmessage = function(msg) {
    // console.log(msg)
    // const li = document.createElement('LI')
    // const p = document.createElement('P')
    // p.innerHTML = window.userName + ' - ' + filterDate(Date.now())
    // li.innerHTML = msg.data
    // li.appendChild(p)
    // ul.appendChild(li)


    str += `
        <li>
            <div class="qq">
                <div class="qq_img">
                    <img src="./img/1.jpg" alt="">
                </div>
                <h1>${window.userName + ' - ' + filterDate(Date.now())}</h1>
            </div>
            <p>${msg.data}</p>
        </li>
    `
    document.getElementById("UL").innerHTML = str
}


function filterDate(val) {
    const date = new Date(val)
    return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate()
}


// 点击发送发送内容
btn.onclick = sendSMS

// 回车发送内容
document.onkeydown = function(e) {
    if (e.keyCode == 13) {
        sendSMS()
    }
}

function sendSMS() {
    const val = stin.value
    if (val) {
        client.send(val)
        stin.value = ''
    } else {
        alert('请输入内容')
    }
}