(this.webpackJsonpwebsmartplug=this.webpackJsonpwebsmartplug||[]).push([[0],{109:function(e,t,a){"use strict";a.r(t);var n=a(1),l=a.n(n),r=a(11),s=a.n(r),m=(a(61),a(14)),c=a(15),o=a(18),i=a.n(o),u=(a(23),function(){return l.a.createElement("header",{className:"Menu-header"},l.a.createElement("br",null),l.a.createElement("h1",{class:"alert alert-primary",role:"alert",id:"titleP"},"PHOTOPLUG"),l.a.createElement("br",null))}),d=[],E="",p="";var g=function(e){var t=e.history;return Object(n.useEffect)((function(){i.a.get(window.$urlSmartPlug).then((function(e){d=e.data})).catch((function(e){console.log("Error al hacer get"+e)}))}),[]),l.a.createElement("div",{className:"Menu"},l.a.createElement(u,null),l.a.createElement("div",{id:"imagesMenu"},l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement("form",{onSubmit:function(){window.$selectedMenPlugs.length=0,d.forEach((function(e){e.smUser===E&&e.smPassword===p&&window.$selectedMenPlugs.push({id:e.id,smLive:e.smLive,smState:e.smState,smGroup:e.smGroup,smTimeStamp:e.smTimeStamp,smProximity:e.smProximity,smEmail:e.smEmail,smStateEmail:e.smStateEmail,smUser:e.smUser,smPassword:e.smPassword,smInitialConf:e.smInitialConf,smPG1:e.smPG1,smPG2:e.smPG2,smPG3:e.smPG3})})),window.$selectedMenPlugs.length>0&&t.push("/smartPlug")}},l.a.createElement("div",{class:"input-group input-group-lg"},l.a.createElement("div",{class:"input-group-prepend"},l.a.createElement("span",{class:"input-group-text",id:"inputGroup-sizing-lg"},"Usuario")),l.a.createElement("input",{type:"text",class:"form-control","aria-label":"Sizing example input","aria-describedby":"inputGroup-sizing-lg",name:"usuarioOfSmartPlug",onChange:function(e){E=e.target.value,window.$user=E}})),l.a.createElement("div",{class:"input-group input-group-lg"},l.a.createElement("div",{class:"input-group-prepend"},l.a.createElement("span",{class:"input-group-text",id:"inputGroup-sizing-lg"},"Contrase\xf1a")),l.a.createElement("input",{type:"text",class:"form-control","aria-label":"Sizing example input","aria-describedby":"inputGroup-sizing-lg",name:"passwordOfSmartPlug",onChange:function(e){p=btoa(e.target.value),window.$password=p}})),l.a.createElement("button",{type:"submit",class:"btn btn-primary"},"Submit")),l.a.createElement("br",null),l.a.createElement("br",null)),l.a.createElement("blockquote",{class:"blockquote text-center"},l.a.createElement("a",{href:"https://github.com/alfredodemiguel/Proyectos/tree/master/PhotoPlug",class:"badge badge-secondary"},"C\xf3digo fuente del proyecto")))},b=a(17),f=a(49),P=a(21),w=a(117),h=a(114),v=a(115),S=a(116),G=a(55),y=[];var O=function(){var e=Object(n.useState)(window.$selectedMenPlugs),t=Object(P.a)(e,2),a=t[0],r=t[1],s=Object(n.useState)(!1),c=Object(P.a)(s,2),o=c[0],d=c[1],E=Object(n.useState)({id:"",smLive:"",smState:"",smGroup:"",smProximity:"",smEmail:"",smStateEmail:""}),p=Object(P.a)(E,2),g=p[0],O=p[1],x=function(e){var t=e.target,a=t.name,n=t.value;O((function(e){return Object(f.a)({},e,Object(b.a)({},a,n))}))};return l.a.createElement("div",{className:"App"},l.a.createElement(u,null),l.a.createElement("table",{className:"table table-bordered"},l.a.createElement("tbody",null,window.$selectedMenPlugs.map((function(e){return l.a.createElement("tr",{key:e.id},l.a.createElement("tr",null,l.a.createElement("td",null,l.a.createElement("strong",null,"ID:"),e.id),l.a.createElement("td",null,l.a.createElement("strong",null,"Vivo:"),e.smLive),l.a.createElement("td",null,l.a.createElement("strong",null,"Estado:"),e.smState),l.a.createElement("td",null,l.a.createElement("strong",null,"Fofo:"),e.smPG2),l.a.createElement("td",null,l.a.createElement("button",{className:"btn btn-primary",onClick:function(){return function(e){O(e),d(!0)}(e)}},"Editar")," ","   ")),l.a.createElement("tr",null,l.a.createElement("td",null,l.a.createElement("img",{src:e.smPG3,width:"100%",height:"100%",alt:"Foto"})),l.a.createElement("td",null,l.a.createElement("button",{className:"btn btn-primary",onClick:function(){return console.log("Estoy en refrescarDatos"),i.a.get(window.$urlSmartPlug).then((function(e){y=e.data})).catch((function(e){console.log("Error al hacer get"+e)})),window.$selectedMenPlugs.length=0,y.forEach((function(e){e.smUser===window.$user&&e.smPassword===window.$password&&window.$selectedMenPlugs.push({id:e.id,smLive:e.smLive,smState:e.smState,smGroup:e.smGroup,smTimeStamp:e.smTimeStamp,smProximity:e.smProximity,smEmail:e.smEmail,smStateEmail:e.smStateEmail,smUser:e.smUser,smPassword:e.smPassword,smInitialConf:e.smInitialConf,smPG1:e.smPG1,smPG2:e.smPG2,smPG3:e.smPG3})})),void r(y)}},"Referescar")," ","   ")))})))),l.a.createElement(w.a,{isOpen:o},l.a.createElement(h.a,null,l.a.createElement("div",null,l.a.createElement("h3",null,"Editar SmartPlug"))),l.a.createElement(v.a,null,l.a.createElement("div",{className:"form-group"},l.a.createElement("label",null,"ID"),l.a.createElement("input",{className:"form-control",readOnly:!0,type:"text",name:"id",value:g&&g.id}),l.a.createElement("br",null),l.a.createElement("label",null,"Vivo"),l.a.createElement("input",{className:"form-control",type:"text",name:"smLive",value:g&&g.smLive,readOnly:!0,onChange:x}),l.a.createElement("br",null),l.a.createElement("label",null,"Estado (Si no se elige estado pasa a Off)"),l.a.createElement("select",{class:"custom-select custom-select-lg mb-3",name:"smState",onChange:x,required:!0},l.a.createElement("option",{selected:!0},"On/Off"),l.a.createElement("option",{value:"On"},"On"),l.a.createElement("option",{value:"Off"},"Off")),l.a.createElement("br",null),l.a.createElement("label",null,"Tomar Fotografia"),l.a.createElement("select",{class:"custom-select custom-select-lg mb-3",name:"smPG2",onChange:x,required:!0},l.a.createElement("option",{selected:!0},"True/False"),l.a.createElement("option",{value:"True"},"True"),l.a.createElement("option",{value:"False"},"False")))),l.a.createElement(S.a,null,l.a.createElement("button",{className:"btn btn-primary",onClick:function(){return function(){var e=a;e.map((function(e){if(e.id===g.id){e.smLive=g.smLive,"On"===g.smState||"Off"===g.smState?e.smState=g.smState:e.smState="Off","True"===g.smPG2||"False"===g.smPG2?e.smPG2=g.smPG2:e.smPG2="False";var t={id:e.id,smLive:e.smLive,smState:e.smState,smGroup:e.smGroup,smTimeStamp:1,smProximity:e.smProximity,smEmail:e.smEmail,smStateEmail:e.smStateEmail,smUser:e.smUser,smPassword:e.smPassword,smInitialConf:"new",smPG1:"nul",smPG2:e.smPG2,smPG3:"nul"};i.a.post(window.$urlSmartPlug,t).then((function(e){console.log(e)})).catch((function(e){console.log(e)}))}return 0})),r(e),d(!1)}()}},"Actualizar"),l.a.createElement("button",{className:"btn btn-danger",onClick:function(){return d(!1)}},"Cancelar"))),l.a.createElement("br",null),l.a.createElement("div",{class:"mx-auto",style:{width:"200px"}},l.a.createElement(G.c,null,l.a.createElement("div",{className:"text-wrap badge badge-secondary",style:{width:"8rem"}},l.a.createElement(m.b,{to:"/"},l.a.createElement("p",{class:"text-white text-center"},"Menu Principal"))))),l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement("blockquote",{class:"blockquote text-right"},l.a.createElement("a",{href:"https://github.com/alfredodemiguel/Proyectos/tree/master/PhotoPlug",class:"badge badge-secondary"},"C\xf3digo fuente del proyecto")))};window.$urlSmartPlug="https://api-smartplug.herokuapp.com/smartplug/",window.$selectedMenPlugs=[],window.$user="",window.$password="";s.a.render(l.a.createElement((function(){return l.a.createElement(m.a,null,l.a.createElement(c.a,{exact:!0,path:"/",component:g}),l.a.createElement(c.a,{path:"/smartPlug",component:function(){return l.a.createElement(O,null)}}))}),null),document.getElementById("root"))},56:function(e,t,a){e.exports=a(109)},61:function(e,t,a){}},[[56,1,2]]]);
//# sourceMappingURL=main.0167a2b1.chunk.js.map