
var text_jgd = document.getElementById("text_jgd");

var text_rl = document.getElementById("text_rl");

var clear_btn = document.getElementById("clear_btn");

var save_btn = document.getElementById("save_btn");



function saveText()
{
    chrome.tabs.getSelected(null, function (tab) {
        // 先获取当前页面的tabID
        debugger;
        chrome.tabs.sendMessage(tab.id, {text_jgd_str: text_jgd.value,
            text_rl_str:text_rl.value
        }, function(response) {
            console.log('sendMessage');
            console.log(response);
        });
    });
}
function clearText()
{
    chrome.tabs.getSelected(null, function (tab) {
        // 先获取当前页面的tabID
        chrome.tabs.sendMessage(tab.id, {text_jgd_str: "clear"
        }, function(response) {
            console.log('sendMessage');
            console.log(response);
        });
    });
}



save_btn.onclick = saveText;
