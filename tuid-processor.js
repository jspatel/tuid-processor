f=function(){
	console.log("Function got called");
   console.log(window.getSelection().toString());
}
document.body.addEventListener('onclick',f);
document.body.addEventListener('ondblclick',f);