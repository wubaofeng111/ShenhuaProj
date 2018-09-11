document.addEventListener('DOMContentLoaded', StartAction);
function StartAction(){
    var atg_store_submit_check = document.getElementById("atg_store_submit_check");
    atg_store_submit_check.value = true;

    var atg_store_submit = document.getElementById("atg_store_submit");
    atg_store_submit.disabled = false;
    // atg_store_submit.click();
    debugger;

}