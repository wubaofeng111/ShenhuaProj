



// 接收来自后台的消息
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
debugger;
    if(request.text_jgd_str == "clear")
    {
        localStorage.removeItem("text_jgd_str");
        localStorage.removeItem("text_rl_str");
    }else 
    {
        localStorage.setItem("text_jgd_str",request.text_jgd_str);
        localStorage.setItem("text_rl_str",request.text_rl_str);
        reloadView();   
    }
});



function StartAction(){

    var jgdStr = localStorage.getItem("text_jgd_str");
    var rlStr  = localStorage.getItem("text_rl_str");
    if(jgdStr.length == 0)
    {
        return;
    }
    if(rlStr.length == 0)
    {
        return;
    }
    var TableS = document.getElementsByClassName("table expandable");
    var Table  = TableS[0];
    var tr_parents = Table.getElementsByClassName("parent");



    if(tr_parents.length == 0 )
    {
      
        setTimeout(function(){reloadView()},2000);
        return;
       
    }
    var sumIndex = -1;

    var dst_actionStr = "";

    for(var i = 0;i<tr_parents.length;i++)
    {
        var tr_parent = tr_parents[i];
        var td_cols = tr_parent.getElementsByTagName("td");
        var td_rl   = td_cols[4];
        var td_jgd  = td_cols[5];

        var rl_str  = td_rl.innerText;
        var jgd_str = td_jgd.innerText;

        if(rl_str.indexOf(rlStr) != -1 && jgd_str.indexOf(jgdStr) != -1)
        {
            dst_actionStr = td_cols[0].innerText;
            sumIndex = i;
            break;
        }
    }

    if(sumIndex != -1)
    {
        var index = sumIndex * 2+1;
        var tbodys = Table.getElementsByTagName("tbody");
        var tbody  = tbodys[0];
        var tr_all = tbody.getElementsByTagName("tr");
        var dstTr  = tr_all[index];
        var btns    = dstTr.getElementsByClassName("btn btn-danger btn-large btn-block");
        debugger;
        // var dstPostId = "addToCart_" + dst_actionStr;
        // var postForm  = document.getElementById(dstPostId);
        var btn = btns[0];
        btn.click();
        
    }else{
        alert("没有搜到您要找的标！");
    }
     

    
}

document.addEventListener('DOMContentLoaded', StartAction);

function reloadView()
{
    console.log("刷新页面");
    window.location.reload()
}
