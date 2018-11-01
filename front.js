



// 接收来自后台的消息
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
    if(request.text_jgd_str == "clear")
    {
        localStorage.removeItem("text_jgd_str");
        localStorage.removeItem("text_rl_str");
        localStorage.removeItem("text_shuliang_str");
    }else 
    {
        localStorage.setItem("text_jgd_str",request.text_jgd_str);
        localStorage.setItem("text_rl_str",request.text_rl_str);
        localStorage.setItem("text_shuliang_str",request.text_shuliang_str);
        reloadView();   
    }
});



function StartAction(){

    var jgdStr = localStorage.getItem("text_jgd_str");
    var rlStr  = localStorage.getItem("text_rl_str");
    var shulStr= localStorage.getItem("text_shuliang_str");

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
        reloadView();
        return;
       
    }
    var sumIndex = -1;


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

    try {
        if(sumIndex != -1)
        {
            var index = sumIndex * 2+1;
            var tbodys = Table.getElementsByTagName("tbody");
            var tbody  = tbodys[0];
            var tr_all = tbody.getElementsByTagName("tr");
            debugger;
            if(int_value > 0)
            {
                /// 有交易数量，就赋值为填写的交易数量
                var curTr = tr_all[sumIndex];
                ///1
                var tds    = curTr.getElementsByTagName("td");
                var curTd  = tds[0];
                /// 获取字符串ID
                var id_str = curTd.innerText;
                var class_buy_count = "weight-amount_"+id_str+" valid";
                debugger;
                /// 供货数量input
                var input_buy_counts = dstTr.getElementsByClassName(class_buy_count);
                var input_buy_count  = input_buy_counts[0];
                var int_value = parseInt(shulStr);
                input_buy_count.value = shulStr;
            }

            var dstTr  = tr_all[index];
            var btns    = dstTr.getElementsByClassName("btn btn-danger btn-large btn-block");
            // var dstPostId = "addToCart_" + dst_actionStr;
            // var postForm  = document.getElementById(dstPostId);
            var btn = btns[0];
            btn.click();
        
        }else{
            reloadView();
            // setTimeout(function(){reloadView()},2000);
        }
    } catch (error) {
        alert(error);
    }
     

    
}

document.addEventListener('DOMContentLoaded', StartAction);

function reloadView()
{
    console.log("刷新页面");
    window.location.reload()
}
