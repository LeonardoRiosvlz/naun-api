(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-83339ff8"],{5086:function(t,e,o){"use strict";o.r(e);var a,s=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("Layout",[o("PageHeader",{attrs:{title:t.title,items:t.items}}),o("div",{staticClass:"clearfix mb-3"},[o("b-button",{staticClass:"float-right btn-info",attrs:{left:""},on:{click:function(e){t.$bvModal.show("modal"),t.editMode=!1}}},[t._v("Crear Cargo")])],1),o("div",{staticClass:"row"},[o("div",{staticClass:"col-12"},[o("div",{staticClass:"card"},[o("div",{staticClass:"card-body"},[o("h4",{staticClass:"card-title"}),o("div",{staticClass:"row mt-4"},[o("div",{staticClass:"col-sm-12 col-md-6"},[o("div",{staticClass:"dataTables_length",attrs:{id:"tickets-table_length"}},[o("label",{staticClass:"d-inline-flex align-items-center"},[t._v(" Show "),o("b-form-select",{attrs:{size:"sm",options:t.pageOptions},model:{value:t.perPage,callback:function(e){t.perPage=e},expression:"perPage"}}),t._v(" entries ")],1)])]),o("div",{staticClass:"col-sm-12 col-md-6"},[o("div",{staticClass:"dataTables_filter text-md-right",attrs:{id:"tickets-table_filter"}},[o("label",{staticClass:"d-inline-flex align-items-center"},[t._v(" Search: "),o("b-form-input",{staticClass:"form-control form-control-sm ml-2",attrs:{type:"search",placeholder:"Search..."},model:{value:t.filter,callback:function(e){t.filter=e},expression:"filter"}})],1)])])]),o("div",{staticClass:"table-responsive mb-0"},[o("b-table",{attrs:{items:t.cargos,fields:t.fields,responsive:"sm","per-page":t.perPage,"current-page":t.currentPage,"sort-by":t.sortBy,"sort-desc":t.sortDesc,filter:t.filter,"filter-included-fields":t.filterOn},on:{"update:sortBy":function(e){t.sortBy=e},"update:sort-by":function(e){t.sortBy=e},"update:sortDesc":function(e){t.sortDesc=e},"update:sort-desc":function(e){t.sortDesc=e},filtered:t.onFiltered},scopedSlots:t._u([{key:"cell(actions)",fn:function(e){return[o("b-dropdown",{attrs:{size:"sm"},scopedSlots:t._u([{key:"button-content",fn:function(){return[t._v(" Action "),o("i",{staticClass:"mdi mdi-chevron-down"})]},proxy:!0}],null,!0)},[o("b-dropdown-item-button",{on:{click:function(o){t.editMode=!0,t.ver=!1,t.setear(e.item.id)}}},[t._v(" Editar ")]),o("b-dropdown-item-button",{on:{click:function(o){return t.eliminarCargo(e.item.id)}}},[t._v(" Eliminar ")]),o("b-dropdown-item-button",{on:{click:function(o){t.editMode=!1,t.ver=!0,t.setear(e.item.id)}}},[t._v(" Ver ")])],1)]}}])})],1),o("div",{staticClass:"row"},[o("div",{staticClass:"col"},[o("div",{staticClass:"dataTables_paginate paging_simple_numbers float-right"},[o("ul",{staticClass:"pagination pagination-rounded mb-0"},[o("b-pagination",{attrs:{"total-rows":t.rows,"per-page":t.perPage},model:{value:t.currentPage,callback:function(e){t.currentPage=e},expression:"currentPage"}})],1)])])])])])]),t._v(" "+t._s(t.cargos)+" ")]),o("b-modal",{attrs:{id:"modal",false:"",size:"lg",title:"Permisos a Coordinadores","hide-footer":""}},[o("h4",[t._v("Consecutivos pendientes")]),o("table",{staticClass:"table my-3"},[o("thead",[o("tr",[o("th",{attrs:{scope:"col"}},[t._v("Consecutivo")]),o("th",{attrs:{scope:"col"}},[t._v("Valor ")]),o("th",{attrs:{scope:"col"}},[t._v("Estado")]),o("th",{attrs:{scope:"col"}},[t._v("Agregar")])])]),o("tbody",t._l(t.consecutivos,(function(e){return o("tr",{key:e.id},[o("th",{attrs:{scope:"row"}},[t._v("ATH"+t._s(e.id))]),o("td",[t._v(t._s(e.total_tecnico))]),o("td",[t._v(t._s(e.estado_pago))]),o("td",[o("button",{staticClass:"btn btn-success"},[t._v("Agregar")])])])})),0)]),o("hr"),o("h4",[t._v("Formato de solicitud de cobro")]),o("table",{directives:[{name:"show",rawName:"v-show",value:t.form.items.length>0,expression:"form.items.length>0"}],staticClass:"table"},[o("thead",[o("tr",[o("th",{attrs:{scope:"col"}},[t._v("ITEM")]),o("th",{attrs:{scope:"col"}},[t._v("PRODUCTO ")]),o("th",{attrs:{scope:"col"}},[t._v("VALOR UNITARIO")]),o("th",{attrs:{scope:"col"}},[t._v("CANTIDAD")]),o("th",{attrs:{scope:"col"}},[t._v("TOTAL")]),o("th",{attrs:{scope:"col"}},[t._v("ACTION")])])]),o("tbody",t._l(t.form.items,(function(e){return o("tr",{key:e.id},[o("th",{attrs:{scope:"row"}},[t._v(t._s(e.id))]),o("td",[t._v(t._s(e.descripcion))]),o("td",[t._v(t._s(t._f("moneda")(e.precio)))]),o("td",[t._v(t._s(e.cantidad))]),o("td",[t._v(t._s(t._f("moneda")(e.total)))]),t.ver?t._e():o("td",[o("a",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover",modifiers:{hover:!0}}],staticClass:"text-danger",attrs:{href:"javascript:void(0);",title:"Borrar"},on:{click:function(e){return t.eliminarItem(t.index)}}},[o("i",{staticClass:"mdi mdi-trash-can font-size-18"})])])])})),0)])])],1)},i=[],r=o("ade3"),n=o("1da1"),c=o("5530"),l=(o("96cf"),o("a434"),o("2b3d"),o("d3b7"),o("3ca3"),o("ddb0"),o("92c3")),d=o.n(l),u=o("2f62"),f=o("7bb1"),m=o("5658"),h=o("2579"),p=(a={components:{vueDropzone:d.a,Layout:m["a"],PageHeader:h["a"],ValidationProvider:f["b"],ValidationObserver:f["a"]},data:function(){return{title:"Administracion",items:[{text:"Gestión corporativa"},{text:"Cargos",active:!0}],dropzoneOptions:{thumbnailWidth:150,maxFilesize:.5,headers:{"My-Awesome-Header":"header value"}},ver:!1,url:"",url_firma:"",modal:!0,file:null,firma:null,email:"",password:"",totalRows:1,currentPage:1,perPage:10,pageOptions:[10,25,50,100],filter:null,filterOn:[],sortBy:"age",sortDesc:!1,fields:["cargo","descripcion","actions"],cargos:[],consecutivos:[],editMode:!1,form:{id:"",cargo:"",descripcion:"",items:[]}}},computed:Object(c["a"])({},Object(u["d"])(["counter"])),created:function(){this.listarUsers()},methods:Object(c["a"])(Object(c["a"])({onFiltered:function(t){this.totalRows=t.length,this.currentPage=1}},Object(u["b"])(["guardarUsuario"])),{},{switchLoc:function(){var t=this;this.editMode?this.$refs.form.validate().then((function(e){e&&t.editarCargos()})):this.$refs.form.validate().then((function(e){e&&t.agregarCargo()}))},adjuntar:function(){},cargar:function(t){for(var e=0;e<this.consecutivos.length;e++){this.consecutivos.id===e&&this.form.items.push({id:this.consecutivos.id,valor_analista:this.consecutivos.total_tecnico,valor_ajuste:this.consecutivos.total_tecnico,precio:this.consecutivos.precio,medida:this.consecutivos.medida,cantidad:this.consecutivos.cantidad,total:this.consecutivos.total});array[e]}this.totalSac()},eliminarItem:function(t){this.form.items.splice(t,1),this.totalSac()},agregarCargo:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){var o,a,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:for(s in o=new FormData,a=t.form,a)o.append(s,a[s]);return e.next=5,t.axios.post("api/cargos",o,{headers:{"Content-Type":"multipart/form-data"}}).then((function(e){if(200==e.status)for(var o in t.$swal("Agregado exito!","","success"),t.listarCargos(),t.$root.$emit("bv::hide::modal","modal","#btnShow"),a)t.form[o]=""})).catch((function(e){console.log(e.response.data.menssage),t.$swal(e.response.data)}));case 5:case"end":return e.stop()}}),e)})))()},editarCargos:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){var o,a,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:for(s in o=new FormData,a=t.form,a)o.append(s,a[s]);return e.next=5,t.axios.put("api/cargos",o).then((function(e){if(200==e.status)for(var o in t.$swal("Editado con exito","","success"),t.listarCargos(),t.$root.$emit("bv::hide::modal","modal","#btnShow"),a)t.form[o]=""})).catch((function(e){t.$swal("ocurrio un problema","","warning")}));case 5:case"end":return e.stop()}}),e)})))()},eliminarCargos:function(t){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function o(){var a;return regeneratorRuntime.wrap((function(o){while(1)switch(o.prev=o.next){case 0:return a=new FormData,a.append("id",t),o.next=4,e.axios.post("api/cargos/delete",a,{headers:{"Content-Type":"multipart/form-data"}}).then((function(t){200==t.status&&(e.$swal("Eliminado con exito!","","success"),e.listarCargos())})).catch((function(t){console.log(t.response.data.menssage),e.$swal(t.response.data)}));case 4:case"end":return o.stop()}}),o)})))()},eliminarCargo:function(t){var e=this;this.$swal({title:"Desea borrar este cargo?",icon:"question",iconHtml:"",confirmButtonText:"Si",cancelButtonText:"No",showCancelButton:!0,showCloseButton:!0}).then((function(o){o.isConfirmed&&e.eliminarCargos(t)}))},resete:function(){var t=this.form;for(var e in t)this.form[e]=""},setear:function(t){for(var e=0;e<this.cargos.length;e++)if(this.cargos[e].id===t)return this.form.id=this.cargos[e].id,this.form.cargo=this.cargos[e].cargo,this.form.descripcion=this.cargos[e].descripcion,void this.$root.$emit("bv::show::modal","modal","#btnShow")},listarPendientes:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.axios.get("/api/programacion/ath/pendientes").then((function(e){t.consecutivos=e.data})).catch((function(t){console.log("error"+t)}));case 2:case"end":return e.stop()}}),e)})))()},setEmail:function(){this.form.username=this.form.email,console.log("holas")},setRoles:function(){"Administrador"===this.form.tipo?(this.form.codigo="",this.form.entidad="No",this.form.cargo="",this.form.roles="3"):"Coordinador"===this.form.tipo?(this.form.entidad="No",this.form.cargo="",this.form.roles="2"):this.form.roles="1"},onFileChange:function(t){var e=t.target.files[0];this.url=URL.createObjectURL(e)},toggleModal:function(){this.modal=!this.modal},session:function(){if(localStorage.getItem("token")){var t=localStorage.getItem("token");this.guardarUsuario(t)}else this.$router.push({name:"Home"})}})},Object(r["a"])(a,"created",(function(){this.session(),this.listarPendientes()})),Object(r["a"])(a,"mounted",(function(){})),Object(r["a"])(a,"computed",{rows:function(){return this.cargos.length}}),a),g=p,v=o("2877"),b=Object(v["a"])(g,s,i,!1,null,null,null);e["default"]=b.exports},a434:function(t,e,o){"use strict";var a=o("23e7"),s=o("23cb"),i=o("a691"),r=o("50c4"),n=o("7b0b"),c=o("65f0"),l=o("8418"),d=o("1dde"),u=d("splice"),f=Math.max,m=Math.min,h=9007199254740991,p="Maximum allowed length exceeded";a({target:"Array",proto:!0,forced:!u},{splice:function(t,e){var o,a,d,u,g,v,b=n(this),_=r(b.length),w=s(t,_),C=arguments.length;if(0===C?o=a=0:1===C?(o=0,a=_-w):(o=C-2,a=m(f(i(e),0),_-w)),_+o-a>h)throw TypeError(p);for(d=c(b,a),u=0;u<a;u++)g=w+u,g in b&&l(d,u,b[g]);if(d.length=a,o<a){for(u=w;u<_-a;u++)g=u+a,v=u+o,g in b?b[v]=b[g]:delete b[v];for(u=_;u>_-a+o;u--)delete b[u-1]}else if(o>a)for(u=_-a;u>w;u--)g=u+a-1,v=u+o-1,g in b?b[v]=b[g]:delete b[v];for(u=0;u<o;u++)b[u+w]=arguments[u+2];return b.length=_-a+o,d}})}}]);
//# sourceMappingURL=chunk-83339ff8.b417cff0.js.map