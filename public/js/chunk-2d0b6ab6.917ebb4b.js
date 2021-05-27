(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0b6ab6"],{"1dc0":function(e,t,r){"use strict";r.r(t);var o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("Layout",[r("PageHeader",{attrs:{title:e.title,items:e.items}}),r("div",{staticClass:"clearfix mb-3"},[r("b-button",{staticClass:"float-right btn-info",attrs:{left:""},on:{click:function(t){e.$bvModal.show("modal"),e.editMode=!1}}},[e._v("Crear Entidad")])],1),r("div",{staticClass:"row"},[r("div",{staticClass:"col-12"},[r("div",{staticClass:"card"},[r("div",{staticClass:"card-body"},[r("h4",{staticClass:"card-title"}),r("div",{staticClass:"row mt-4"},[r("div",{staticClass:"col-sm-12 col-md-6"},[r("div",{staticClass:"dataTables_length",attrs:{id:"tickets-table_length"}},[r("label",{staticClass:"d-inline-flex align-items-center"},[e._v(" Show "),r("b-form-select",{attrs:{size:"sm",options:e.pageOptions},model:{value:e.perPage,callback:function(t){e.perPage=t},expression:"perPage"}}),e._v(" entries ")],1)])]),r("div",{staticClass:"col-sm-12 col-md-6"},[r("div",{staticClass:"dataTables_filter text-md-right",attrs:{id:"tickets-table_filter"}},[r("label",{staticClass:"d-inline-flex align-items-center"},[e._v(" Search: "),r("b-form-input",{staticClass:"form-control form-control-sm ml-2",attrs:{type:"search",placeholder:"Search..."},model:{value:e.filter,callback:function(t){e.filter=t},expression:"filter"}})],1)])])]),r("div",{staticClass:"table-responsive mb-0"},[r("b-table",{attrs:{items:e.entidades,fields:e.fields,responsive:"sm","per-page":e.perPage,"current-page":e.currentPage,"sort-by":e.sortBy,"sort-desc":e.sortDesc,filter:e.filter,"filter-included-fields":e.filterOn},on:{"update:sortBy":function(t){e.sortBy=t},"update:sort-by":function(t){e.sortBy=t},"update:sortDesc":function(t){e.sortDesc=t},"update:sort-desc":function(t){e.sortDesc=t},filtered:e.onFiltered},scopedSlots:e._u([{key:"cell(actions)",fn:function(t){return[r("b-dropdown",{attrs:{size:"sm"},scopedSlots:e._u([{key:"button-content",fn:function(){return[e._v(" Action "),r("i",{staticClass:"mdi mdi-chevron-down"})]},proxy:!0}],null,!0)},[r("b-dropdown-item-button",{on:{click:function(r){e.editMode=!0,e.ver=!1,e.setear(t.item.id)}}},[r("b-icon",{attrs:{icon:"pencil"}}),e._v(" Editar ")],1),r("b-dropdown-item-button",{on:{click:function(r){return e.eliminarEntidad(t.item.id)}}},[r("b-icon",{attrs:{icon:"trash"}}),e._v(" Eliminar ")],1),r("b-dropdown-item-button",{on:{click:function(r){return e.setPermisos(t.item.id)}}},[r("b-icon",{attrs:{icon:"arrow-left-right"}}),e._v(" Permisos ")],1),r("b-dropdown-item-button",{on:{click:function(r){e.editMode=!1,e.ver=!0,e.setear(t.item.id)}}},[r("b-icon",{attrs:{icon:"eye"}}),e._v(" Ver ")],1)],1)]}}])})],1),r("div",{staticClass:"row"},[r("div",{staticClass:"col"},[r("div",{staticClass:"dataTables_paginate paging_simple_numbers float-right"},[r("ul",{staticClass:"pagination pagination-rounded mb-0"},[r("b-pagination",{attrs:{"total-rows":e.rows,"per-page":e.perPage},model:{value:e.currentPage,callback:function(t){e.currentPage=t},expression:"currentPage"}})],1)])])])])])])]),r("b-modal",{attrs:{id:"permisos",false:"",size:"lg",title:"Permisos a Coordinadores","hide-footer":""}},[r("b-row",{staticClass:"mb-3"},[r("b-col",{attrs:{md:"3"}},[r("b-form-input",{attrs:{type:"search",id:"filterInput",placeholder:"Buscar"},model:{value:e.filter_user,callback:function(t){e.filter_user=t},expression:"filter_user"}})],1)],1),r("h4",[e._v("Coodinadores")]),r("b-table",{staticClass:"table",attrs:{id:"my-table",items:e.users,"per-page":e.porPagina,"current-page":e.pagina,small:"",filter:e.filter_user,fields:e.fields_user},scopedSlots:e._u([{key:"cell(actions)",fn:function(t){return[r("button",{staticClass:"btn btn-success",on:{click:function(r){return e.asignarPermiso(t.item.id)}}},[e._v(" Asignar")])]}}])}),r("hr"),r("h4",[e._v("Permisos Otorgados")]),r("b-table",{attrs:{striped:"",hover:"",items:e.permisos,fields:e.fields_permisos},scopedSlots:e._u([{key:"cell(nombre)",fn:function(t){return[e._v(" "+e._s(t.item.user.nombre)+" "+e._s(t.item.user.apellido)+" ")]}},{key:"cell(Email)",fn:function(t){return[e._v(" "+e._s(t.item.user.email)+" ")]}},{key:"cell(Entidad)",fn:function(t){return[e._v(" "+e._s(t.item.entidad.empresa)+" ")]}},{key:"cell(actions)",fn:function(t){return[r("button",{staticClass:"btn btn-danger",on:{click:function(r){return e.eliminarPermiso(t.item.id)}}},[e._v(" Eliminar")])]}}])})],1),r("b-modal",{attrs:{id:"modal",false:"",size:"lg",title:"Gestión de entidades","hide-footer":""}},[r("ValidationObserver",{ref:"form"},[r("b-row",[r("b-col",[r("div",{staticClass:"form-group"},[r("label",[e._v("Nombre ")]),r("ValidationProvider",{attrs:{name:"cargo",rules:"required|alpha_spaces"},scopedSlots:e._u([{key:"default",fn:function(t){var o=t.errors;return[r("input",{directives:[{name:"model",rawName:"v-model",value:e.form.nombre,expression:"form.nombre"}],staticClass:"form-control",attrs:{type:"text",placeholder:" ",disabled:e.ver},domProps:{value:e.form.nombre},on:{input:function(t){t.target.composing||e.$set(e.form,"nombre",t.target.value)}}}),r("span",{staticStyle:{color:"red"}},[e._v(e._s(o[0]))])]}}])})],1)]),r("b-col",[r("div",{staticClass:"form-group"},[r("label",[e._v("Apellido ")]),r("ValidationProvider",{attrs:{name:"cargo",rules:"required|alpha_spaces"},scopedSlots:e._u([{key:"default",fn:function(t){var o=t.errors;return[r("input",{directives:[{name:"model",rawName:"v-model",value:e.form.apellido,expression:"form.apellido"}],staticClass:"form-control",attrs:{type:"text",placeholder:" ",disabled:e.ver},domProps:{value:e.form.apellido},on:{input:function(t){t.target.composing||e.$set(e.form,"apellido",t.target.value)}}}),r("span",{staticStyle:{color:"red"}},[e._v(e._s(o[0]))])]}}])})],1)])],1),r("b-row",[r("b-col",[r("div",{staticClass:"form-group"},[r("label",[e._v("Email")]),r("ValidationProvider",{attrs:{name:"descripcion",rules:"required|email"},scopedSlots:e._u([{key:"default",fn:function(t){var o=t.errors;return[r("input",{directives:[{name:"model",rawName:"v-model",value:e.form.email,expression:"form.email"}],staticClass:"form-control",attrs:{type:"text",placeholder:" ",disabled:e.ver},domProps:{value:e.form.email},on:{input:function(t){t.target.composing||e.$set(e.form,"email",t.target.value)}}}),r("span",{staticStyle:{color:"red"}},[e._v(e._s(o[0]))])]}}])})],1)]),r("b-col",[r("div",{staticClass:"form-group"},[r("label",[e._v("Teléfono")]),r("ValidationProvider",{attrs:{name:"telefono",rules:"required"},scopedSlots:e._u([{key:"default",fn:function(t){var o=t.errors;return[r("input",{directives:[{name:"model",rawName:"v-model",value:e.form.telefono,expression:"form.telefono"}],staticClass:"form-control",attrs:{type:"text",placeholder:" ",disabled:e.ver},domProps:{value:e.form.telefono},on:{input:function(t){t.target.composing||e.$set(e.form,"telefono",t.target.value)}}}),r("span",{staticStyle:{color:"red"}},[e._v(e._s(o[0]))])]}}])})],1)])],1),r("hr"),r("b-row",[r("b-col",[r("div",{staticClass:"form-group"},[r("label",[e._v("Empresa ")]),r("ValidationProvider",{attrs:{name:"empresa",rules:"required"},scopedSlots:e._u([{key:"default",fn:function(t){var o=t.errors;return[r("input",{directives:[{name:"model",rawName:"v-model",value:e.form.empresa,expression:"form.empresa"}],staticClass:"form-control",attrs:{type:"text",placeholder:" ",disabled:e.ver},domProps:{value:e.form.empresa},on:{input:function(t){t.target.composing||e.$set(e.form,"empresa",t.target.value)}}}),r("span",{staticStyle:{color:"red"}},[e._v(e._s(o[0]))])]}}])})],1)]),r("b-col",[r("div",{staticClass:"form-group"},[r("label",[e._v("Página Web")]),r("ValidationProvider",{attrs:{name:"pagina",rules:"required"},scopedSlots:e._u([{key:"default",fn:function(t){var o=t.errors;return[r("input",{directives:[{name:"model",rawName:"v-model",value:e.form.pagina,expression:"form.pagina"}],staticClass:"form-control",attrs:{type:"text",placeholder:" ",disabled:e.ver},domProps:{value:e.form.pagina},on:{input:function(t){t.target.composing||e.$set(e.form,"pagina",t.target.value)}}}),r("span",{staticStyle:{color:"red"}},[e._v(e._s(o[0]))])]}}])})],1)])],1),r("b-row",[r("b-col",[r("div",{staticClass:"form-group"},[r("label",[e._v("Nit ")]),r("ValidationProvider",{attrs:{name:"nit",rules:"required"},scopedSlots:e._u([{key:"default",fn:function(t){var o=t.errors;return[r("input",{directives:[{name:"model",rawName:"v-model",value:e.form.nit,expression:"form.nit"}],staticClass:"form-control",attrs:{type:"text",placeholder:" ",disabled:e.ver},domProps:{value:e.form.nit},on:{input:function(t){t.target.composing||e.$set(e.form,"nit",t.target.value)}}}),r("span",{staticStyle:{color:"red"}},[e._v(e._s(o[0]))])]}}])})],1)]),r("b-col",[r("div",{staticClass:"form-group"},[r("label",[e._v("Teléfono empresa ")]),r("ValidationProvider",{attrs:{name:"telefono_empresa",rules:"required"},scopedSlots:e._u([{key:"default",fn:function(t){var o=t.errors;return[r("input",{directives:[{name:"model",rawName:"v-model",value:e.form.telefono_empresa,expression:"form.telefono_empresa"}],staticClass:"form-control",attrs:{type:"text",placeholder:" ",disabled:e.ver},domProps:{value:e.form.telefono_empresa},on:{input:function(t){t.target.composing||e.$set(e.form,"telefono_empresa",t.target.value)}}}),r("span",{staticStyle:{color:"red"}},[e._v(e._s(o[0]))])]}}])})],1)])],1),r("b-row",[r("b-col",[r("div",{staticClass:"form-group"},[r("label",[e._v("Dirección ")]),r("ValidationProvider",{attrs:{name:"direccion",rules:"required"},scopedSlots:e._u([{key:"default",fn:function(t){var o=t.errors;return[r("input",{directives:[{name:"model",rawName:"v-model",value:e.form.direccion,expression:"form.direccion"}],staticClass:"form-control",attrs:{type:"text",placeholder:" ",disabled:e.ver},domProps:{value:e.form.direccion},on:{input:function(t){t.target.composing||e.$set(e.form,"direccion",t.target.value)}}}),r("span",{staticStyle:{color:"red"}},[e._v(e._s(o[0]))])]}}])})],1)])],1),r("b-row",[r("b-col",[r("div",{staticClass:"form-group"},[r("label",[e._v("Categorias ")]),r("b-form-checkbox-group",{staticClass:"mb-3",attrs:{options:e.categorias,"value-field":"categoria","text-field":"categoria","disabled-field":"notEnabled"},model:{value:e.form.categorias,callback:function(t){e.$set(e.form,"categorias",t)},expression:"form.categorias"}})],1)])],1),r("hr"),r("b-row",[r("b-col",[r("div",{staticClass:"form-group"},[r("label",[e._v("Valor de contrato ")]),r("ValidationProvider",{attrs:{name:"valor_Contrato",rules:"required"},scopedSlots:e._u([{key:"default",fn:function(t){var o=t.errors;return[r("input",{directives:[{name:"model",rawName:"v-model",value:e.form.valor_contrato,expression:"form.valor_contrato"}],staticClass:"form-control",attrs:{type:"text",placeholder:" ",disabled:e.ver},domProps:{value:e.form.valor_contrato},on:{input:function(t){t.target.composing||e.$set(e.form,"valor_contrato",t.target.value)}}}),r("span",{staticStyle:{color:"red"}},[e._v(e._s(o[0]))])]}}])})],1)]),r("b-col",[r("div",{staticClass:"form-group"},[r("label",[e._v("Require presupuesto")]),r("ValidationProvider",{attrs:{name:"requiere_presupuesto",rules:"required"},scopedSlots:e._u([{key:"default",fn:function(t){var o=t.errors;return[r("select",{directives:[{name:"model",rawName:"v-model",value:e.form.requiere_presupuesto,expression:"form.requiere_presupuesto"}],staticClass:"form-control form-control-lg",attrs:{name:"requiere_presupuesto"},on:{change:function(t){var r=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.$set(e.form,"requiere_presupuesto",t.target.multiple?r:r[0])}}},[r("option",{attrs:{value:"Si"}},[e._v("Si")]),r("option",{attrs:{value:"No"}},[e._v("No")])]),r("span",{staticStyle:{color:"red"}},[e._v(e._s(o[0]))])]}}])})],1)])],1),r("b-row",[r("b-col",[r("div",{staticClass:"form-group"},[r("label",[e._v("Presupuesto ")]),r("ValidationProvider",{attrs:{name:"presupuesto",rules:"required"},scopedSlots:e._u([{key:"default",fn:function(t){var o=t.errors;return[r("input",{directives:[{name:"model",rawName:"v-model",value:e.form.presupuesto,expression:"form.presupuesto"}],staticClass:"form-control",attrs:{type:"text",placeholder:" ",disabled:e.ver},domProps:{value:e.form.presupuesto},on:{input:function(t){t.target.composing||e.$set(e.form,"presupuesto",t.target.value)}}}),r("span",{staticStyle:{color:"red"}},[e._v(e._s(o[0]))])]}}])})],1)]),r("b-col",[r("div",{staticClass:"form-group"},[r("label",[e._v("Aviso")]),r("ValidationProvider",{attrs:{name:"aviso",rules:"required"},scopedSlots:e._u([{key:"default",fn:function(t){var o=t.errors;return[r("input",{directives:[{name:"model",rawName:"v-model",value:e.form.aviso,expression:"form.aviso"}],staticClass:"form-control",attrs:{type:"text",placeholder:" ",disabled:e.ver},domProps:{value:e.form.aviso},on:{input:function(t){t.target.composing||e.$set(e.form,"aviso",t.target.value)}}}),r("span",{staticStyle:{color:"red"}},[e._v(e._s(o[0]))])]}}])})],1)])],1),r("b-row",[r("b-col",[r("label",[e._v("Logo")]),r("div",{attrs:{id:"preview"}},[e.url?r("img",{staticClass:"rounded",staticStyle:{float:"center!importan"},attrs:{width:"100%",src:e.url}}):e._e()]),r("b-form-file",{attrs:{placeholder:"Seleccione su image...","drop-placeholder":"Drop file here..."},on:{change:e.onFileChange},model:{value:e.file,callback:function(t){e.file=t},expression:"file"}})],1)],1)],1),e.ver||e.editMode?e._e():r("button",{staticClass:"btn btn-block float-right btn-success",on:{click:e.switchLoc}},[e._v("Guardar")]),!e.ver&&e.editMode?r("button",{staticClass:"btn btn-block float-right btn-success",on:{click:e.switchLoc}},[e._v("Editar")]):e._e()],1)],1)},a=[],s=r("ade3"),i=r("1da1"),n=r("5530"),l=(r("2b3d"),r("d3b7"),r("3ca3"),r("ddb0"),r("96cf"),r("2f62")),c=r("7bb1"),d=r("5658"),u=r("2579"),m=Object(s["a"])({components:{Layout:d["a"],PageHeader:u["a"],ValidationProvider:c["b"],ValidationObserver:c["a"]},data:function(){return{title:"Administracion",items:[{text:"Gestión corporativa"},{text:"Entidades",active:!0}],dropzoneOptions:{thumbnailWidth:150,maxFilesize:.5,headers:{"My-Awesome-Header":"header value"}},ver:!1,url:"",categorias:[],selected:["Categoria"],url_firma:"",modal:!0,file:null,firma:null,email:"",password:"",totalRows:1,currentPage:1,perPage:10,pageOptions:[10,25,50,100],filter:null,filterOn:[],sortBy:"age",sortDesc:!1,fields:["nombre","apellido","telefono","email","empresa","actions"],entidades:[],users:[],fields_user:["nombre","apellido","email","actions"],permisos:[],fields_permisos:["Nombre","Email","Entidad","actions"],editMode:!1,form:{id:"",nombre:"Jose",apellido:"Rios",email:"leo@gmail.com",telefono:"456465",empresa:"COLPATRIA",pagina:" www.colpatria.com",nit:"7897998",categorias:[],telefono_empresa:"12456465",direccion:"direccion calle troncal",valor_contrato:"123456464",requiere_presupuesto:"Si",presupuesto:"1845426",aviso:"aviso"}}},computed:Object(n["a"])({},Object(l["d"])(["counter"])),methods:Object(n["a"])(Object(n["a"])({onFiltered:function(e){this.totalRows=e.length,this.currentPage=1}},Object(l["b"])(["guardarUsuario"])),{},{switchLoc:function(){var e=this;this.editMode?this.$refs.form.validate().then((function(t){t&&e.editarentidades()})):this.$refs.form.validate().then((function(t){t&&e.agregarEntidad()}))},agregarEntidad:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var r,o,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:for(a in r=new FormData,o=e.form,o)"categorias"==a?r.append(a,JSON.stringify(o[a])):r.append(a,o[a]);return e.file&&r.append("filename",e.file),t.next=6,e.axios.post("api/entidades",r,{headers:{"Content-Type":"multipart/form-data"}}).then((function(t){if(200==t.status)for(var r in e.$swal("Agregado exito!","","success"),e.listarentidades(),e.$root.$emit("bv::hide::modal","modal","#btnShow"),o)e.form[r]=""})).catch((function(t){console.log(t.response.data.menssage),e.$swal(t.response.data)}));case 6:case"end":return t.stop()}}),t)})))()},editarentidades:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var r,o,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:for(a in r=new FormData,o=e.form,o)"categorias"==a?r.append(a,JSON.stringify(o[a])):r.append(a,o[a]);return e.file&&r.append("filename",e.file),t.next=6,e.axios.put("api/entidades",r).then((function(t){if(200==t.status)for(var r in e.$swal("Editado con exito!","","success"),e.listarentidades(),e.$root.$emit("bv::hide::modal","modal","#btnShow"),o)e.form[r]=""})).catch((function(t){console.log(t.response.data.menssage),e.$swal("Error de peticion!","","warning")}));case 6:case"end":return t.stop()}}),t)})))()},eliminarentidades:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){var o;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return o=new FormData,o.append("id",e),r.next=4,t.axios.post("api/entidades/delete",o,{headers:{"Content-Type":"multipart/form-data"}}).then((function(e){200==e.status&&(t.$swal("Eliminado con exito!","","success"),t.listarentidades())})).catch((function(e){console.log(e.response.data.menssage),t.$swal(e.response.data)}));case 4:case"end":return r.stop()}}),r)})))()},eliminarPermisos:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){var o;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return o=new FormData,o.append("id",e),r.next=4,t.axios.post("api/permisos/delete",o,{headers:{"Content-Type":"multipart/form-data"}}).then((function(e){200==e.status&&(t.$swal("Eliminado con exito!","","success"),t.listarPermisos(t.form.id))})).catch((function(e){console.log(e.response.data.menssage),t.$swal(e.response.data)}));case 4:case"end":return r.stop()}}),r)})))()},asignarPermisos:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){var o;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return o=new FormData,o.append("eid",t.form.id),o.append("uid",e),r.next=5,t.axios.post("api/permisos/",o,{headers:{"Content-Type":"multipart/form-data"}}).then((function(e){200==e.status&&(t.$swal("Asignado con exito!","","success"),t.listarPermisos(t.form.id))})).catch((function(e){console.log(e.response.data.menssage),t.$swal(e.response.data)}));case 5:case"end":return r.stop()}}),r)})))()},eliminarEntidad:function(e){var t=this;this.$swal({title:"Desea borrar esta categoria?",icon:"question",iconHtml:"",confirmButtonText:"Si",cancelButtonText:"No",showCancelButton:!0,showCloseButton:!0}).then((function(r){r.isConfirmed&&t.eliminarentidades(e)}))},eliminarPermiso:function(e){var t=this;this.$swal({title:"Desea borrar este permiso?",icon:"question",iconHtml:"",confirmButtonText:"Si",cancelButtonText:"No",showCancelButton:!0,showCloseButton:!0}).then((function(r){r.isConfirmed&&t.eliminarPermisos(e)}))},asignarPermiso:function(e){for(var t=this,r=0;r<this.permisos.length;r++)if(this.permisos[r].uid===e)return void this.$swal("Usuario ya tiene permiso para esta entidad!","","success");this.$swal({title:"Desea asignar el  permiso?",icon:"question",iconHtml:"",confirmButtonText:"Si",cancelButtonText:"No",showCancelButton:!0,showCloseButton:!0}).then((function(r){r.isConfirmed&&t.asignarPermisos(e)}))},resete:function(){},setear:function(e){for(var t=0;t<this.entidades.length;t++)if(this.entidades[t].id===e)return this.form.id=this.entidades[t].id,this.form.nombre=this.entidades[t].nombre,this.form.apellido=this.entidades[t].apellido,this.form.email=this.entidades[t].email,this.form.telefono=this.entidades[t].telefono,this.form.empresa=this.entidades[t].empresa,this.form.pagina=this.entidades[t].pagina,this.form.nit=this.entidades[t].nit,this.form.telefono_empresa=this.entidades[t].telefono_empresa,this.form.direccion=this.entidades[t].direccion,this.form.valor_contrato=this.entidades[t].valor_contrato,this.form.requiere_presupuesto=this.entidades[t].requiere_presupuesto,this.form.presupuesto=this.entidades[t].presupuesto,this.form.aviso=this.entidades[t].aviso,this.form.categorias=JSON.parse(this.entidades[t].categorias),this.form.categorias=JSON.parse(this.form.categorias),void this.$root.$emit("bv::show::modal","modal","#btnShow")},setPermisos:function(e){for(var t=0;t<this.entidades.length;t++)if(this.entidades[t].id===e)return this.form.id=this.entidades[t].id,this.listarPermisos(this.form.id),void this.$root.$emit("bv::show::modal","permisos","#btnShow")},listarPermisos:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r=new FormData,r.append("id",t.form.id),e.next=4,t.axios.post("api/permisos/get",r,{headers:{"Content-Type":"multipart/form-data"}}).then((function(e){200==e.status&&(t.permisos=e.data)})).catch((function(e){console.log(e.response.data.menssage),t.$swal(e.response.data)}));case 4:case"end":return e.stop()}}),e)})))()},listarCategorias:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.axios.get("api/categorias").then((function(t){e.categorias=t.data.rows})).catch((function(e){console.log("error"+e)}));case 2:case"end":return t.stop()}}),t)})))()},listarentidades:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.axios.get("api/entidades").then((function(t){e.entidades=t.data.rows})).catch((function(e){console.log("error"+e)}));case 2:case"end":return t.stop()}}),t)})))()},listarUsers:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.axios.get("user/coordinadores").then((function(t){e.users=t.data})).catch((function(e){console.log("error"+e)}));case 2:case"end":return t.stop()}}),t)})))()},setEmail:function(){this.form.username=this.form.email,console.log("holas")},onFileChange:function(e){var t=e.target.files[0];this.url=URL.createObjectURL(t)},toggleModal:function(){this.modal=!this.modal},session:function(){if(localStorage.getItem("token")){var e=localStorage.getItem("token");this.guardarUsuario(e)}else this.$router.push({name:"Home"})}}),created:function(){this.session(),this.listarentidades(),this.listarCategorias(),this.listarUsers()}},"computed",{rows:function(){return this.entidades.length},rows_user:function(){return this.users.length}}),p=m,f=r("2877"),v=Object(f["a"])(p,o,a,!1,null,null,null);t["default"]=v.exports}}]);
//# sourceMappingURL=chunk-2d0b6ab6.917ebb4b.js.map