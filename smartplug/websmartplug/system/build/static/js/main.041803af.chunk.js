(this.webpackJsonpwebsmartplug=this.webpackJsonpwebsmartplug||[]).push([[0],{109:function(e,t,a){"use strict";a.r(t);var l=a(1),n=a.n(l),r=a(11),m=a.n(r),s=(a(61),a(14)),c=a(15),u=a(19),i=a.n(u),o=(a(39),[]),E="",p="";var d=function(e){var t=e.history;return Object(l.useEffect)((function(){i.a.get(window.$urlSmartPlug).then((function(e){o=e.data})).catch((function(e){console.log("Error al hacer get"+e)}))}),[]),n.a.createElement("div",{className:"Menu"},n.a.createElement("header",{className:"Menu-header"},n.a.createElement("br",null),n.a.createElement("h1",{class:"alert alert-primary",role:"alert",id:"titleP"},"SMARTPLUG"),n.a.createElement("br",null)),n.a.createElement("div",{id:"imagesMenu"},n.a.createElement("br",null),n.a.createElement("br",null),n.a.createElement("form",{onSubmit:function(){window.$selectedMenPlugs.length=0,o.forEach((function(e){e.smUser===E&&e.smPassword===p&&window.$selectedMenPlugs.push({id:e.id,smLive:e.smLive,smState:e.smState,smGroup:e.smGroup,smTimeStamp:e.smTimeStamp,smProximity:e.smProximity,smEmail:e.smEmail,smStateEmail:e.smStateEmail,smUser:e.smUser,smPassword:e.smPassword,smInitialConf:e.smInitialConf,smPG1:e.smPG1,smPG2:e.smPG2,smPG3:e.smPG3})})),window.$selectedMenPlugs.length>0&&t.push("/smartPlug")}},n.a.createElement("div",{class:"input-group input-group-lg"},n.a.createElement("div",{class:"input-group-prepend"},n.a.createElement("span",{class:"input-group-text",id:"inputGroup-sizing-lg"},"Usuario")),n.a.createElement("input",{type:"text",class:"form-control","aria-label":"Sizing example input","aria-describedby":"inputGroup-sizing-lg",name:"usuarioOfSmartPlug",onChange:function(e){E=e.target.value}})),n.a.createElement("div",{class:"input-group input-group-lg"},n.a.createElement("div",{class:"input-group-prepend"},n.a.createElement("span",{class:"input-group-text",id:"inputGroup-sizing-lg"},"Contrase\xf1a")),n.a.createElement("input",{type:"text",class:"form-control","aria-label":"Sizing example input","aria-describedby":"inputGroup-sizing-lg",name:"passwordOfSmartPlug",onChange:function(e){p=btoa(e.target.value)}})),n.a.createElement("button",{type:"submit",class:"btn btn-primary"},"Submit")),n.a.createElement("br",null),n.a.createElement("br",null)),n.a.createElement("blockquote",{class:"blockquote text-center"},n.a.createElement("a",{href:"https://github.com/alfredodemiguel/Proyectos/tree/master/smartplug",class:"badge badge-secondary"},"C\xf3digo fuente del proyecto")))},b=a(17),g=a(49),f=a(21),h=a(117),P=a(114),v=a(115),y=a(116),S=a(55);var x=function(){var e=Object(l.useState)(window.$selectedMenPlugs),t=Object(f.a)(e,2),a=t[0],r=t[1],m=Object(l.useState)(!1),c=Object(f.a)(m,2),u=c[0],o=c[1],E=Object(l.useState)({id:"",smLive:"",smState:"",smGroup:"",smProximity:"",smEmail:"",smStateEmail:""}),p=Object(f.a)(E,2),d=p[0],x=p[1],w=function(e){var t=e.target,a=t.name,l=t.value;x((function(e){return Object(g.a)({},e,Object(b.a)({},a,l))}))};return n.a.createElement("div",{className:"App"},n.a.createElement("h1",{class:"alert alert-primary",role:"alert",id:"titleP"},"SMARTPLUG"),n.a.createElement("br",null),n.a.createElement("br",null),n.a.createElement("br",null),n.a.createElement("table",{className:"table table-bordered"},n.a.createElement("thead",null,n.a.createElement("tr",null,n.a.createElement("th",null,"ID"),n.a.createElement("th",null,"Vivo"),n.a.createElement("th",null,"Estado"),n.a.createElement("th",null,"Grupo"),n.a.createElement("th",null,"Proximidad"),n.a.createElement("th",null,"Email"),n.a.createElement("th",null,"Estado Email"))),n.a.createElement("tbody",null,window.$selectedMenPlugs.map((function(e){return n.a.createElement("tr",{key:e.id},n.a.createElement("td",null,e.id),n.a.createElement("td",null,e.smLive),n.a.createElement("td",null,e.smState),n.a.createElement("td",null,e.smGroup),n.a.createElement("td",null,e.smProximity),n.a.createElement("td",null,e.smEmail),n.a.createElement("td",null,e.smStateEmail),n.a.createElement("td",null,n.a.createElement("button",{className:"btn btn-primary",onClick:function(){return function(e){x(e),o(!0)}(e)}},"Editar")," ","   "))})))),n.a.createElement(h.a,{isOpen:u},n.a.createElement(P.a,null,n.a.createElement("div",null,n.a.createElement("h3",null,"Editar SmartPlug"))),n.a.createElement(v.a,null,n.a.createElement("div",{className:"form-group"},n.a.createElement("label",null,"ID"),n.a.createElement("input",{className:"form-control",readOnly:!0,type:"text",name:"id",value:d&&d.id}),n.a.createElement("br",null),n.a.createElement("label",null,"Vivo"),n.a.createElement("input",{className:"form-control",type:"text",name:"smLive",value:d&&d.smLive,onChange:w}),n.a.createElement("br",null),n.a.createElement("label",null,"Estado"),n.a.createElement("input",{className:"form-control",type:"text",name:"smState",value:d&&d.smState,onChange:w}),n.a.createElement("br",null),n.a.createElement("label",null,"Grupo"),n.a.createElement("input",{className:"form-control",type:"text",name:"smGroup",value:d&&d.smGroup,onChange:w}),n.a.createElement("br",null),n.a.createElement("label",null,"Proximidad"),n.a.createElement("input",{className:"form-control",type:"text",name:"smProximity",value:d&&d.smProximity,onChange:w}),n.a.createElement("br",null),n.a.createElement("label",null,"Email"),n.a.createElement("input",{className:"form-control",type:"text",name:"smEmail",value:d&&d.smEmail,onChange:w}),n.a.createElement("br",null),n.a.createElement("label",null,"Estado Email"),n.a.createElement("input",{className:"form-control",type:"text",name:"smStateEmail",value:d&&d.smStateEmail,onChange:w}),n.a.createElement("br",null))),n.a.createElement(y.a,null,n.a.createElement("button",{className:"btn btn-primary",onClick:function(){return function(){var e=a;e.map((function(e){if(e.id===d.id){e.smLive=d.smLive,e.smState=d.smState,e.smGroup=d.smGroup,e.smProximity=d.smProximity,e.smEmail=d.smEmail,e.smStateEmail=d.smStateEmail;var t={id:e.id,smLive:e.smLive,smState:e.smState,smGroup:e.smGroup,smTimeStamp:1,smProximity:e.smProximity,smEmail:e.smEmail,smStateEmail:e.smStateEmail,smUser:e.smUser,smPassword:e.smPassword,smInitialConf:"new",smPG1:"nul",smPG2:"nul",smPG3:"nul"};i.a.post(window.$urlSmartPlug,t).then((function(e){console.log("response:"),console.log(e)})).catch((function(e){console.log(e)}))}return 0})),r(e),o(!1)}()}},"Actualizar"),n.a.createElement("button",{className:"btn btn-danger",onClick:function(){return o(!1)}},"Cancelar"))),n.a.createElement("br",null),n.a.createElement("div",{class:"mx-auto",style:{width:"200px"}},n.a.createElement(S.c,null,n.a.createElement("div",{className:"text-wrap badge badge-secondary",style:{width:"8rem"}},n.a.createElement(s.b,{to:"/"},n.a.createElement("p",{class:"text-white text-center"},"Menu Principal"))))),n.a.createElement("br",null),n.a.createElement("br",null),n.a.createElement("br",null),n.a.createElement("br",null),n.a.createElement("blockquote",{class:"blockquote text-right"},n.a.createElement("a",{href:"https://github.com/alfredodemiguel/Proyectos/tree/master/smartplug",class:"badge badge-secondary"},"C\xf3digo fuente del proyecto")))};window.$urlSmartPlug="http://api-smartplug.herokuapp.com/smartplug/",window.$selectedMenPlugs=[];m.a.render(n.a.createElement((function(){return n.a.createElement(s.a,null,n.a.createElement(c.a,{exact:!0,path:"/",component:d}),n.a.createElement(c.a,{path:"/smartPlug",component:function(){return n.a.createElement(x,null)}}))}),null),document.getElementById("root"))},56:function(e,t,a){e.exports=a(109)},61:function(e,t,a){}},[[56,1,2]]]);
//# sourceMappingURL=main.041803af.chunk.js.map