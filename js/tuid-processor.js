console.log("Starting the extension");
f=function(){
   console.log("Function got called");
   console.log(window.getSelection().toString());
}
//document.body.addEventListener('onclick',f);
document.addEventListener('ondblclick',f);
document.addEventListener('onclick',f);