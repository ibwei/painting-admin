(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a4b9f7da","chunk-5820e3fc","chunk-76efcd82"],{"1b11":function(e,t,a){"use strict";var i=a("98ac"),s=a.n(i);s.a},"49cb":function(e,t,a){"use strict";var i=a("f3de"),s=a("d880"),r=a("5999"),o=a("92ba"),n=a("d621"),l=a("d2d3"),d=a("5d6cd"),c=a("a88b"),u=a("2c23"),p=a("68c4"),f=a("b155").f,h=a("2d98").f,m=a("aa96").f,b=a("e89c").trim,v="Number",y=s[v],g=y.prototype,k=l(p(g))==v,I=function(e){var t,a,i,s,r,o,n,l,d=c(e,!1);if("string"==typeof d&&d.length>2)if(d=b(d),t=d.charCodeAt(0),43===t||45===t){if(a=d.charCodeAt(2),88===a||120===a)return NaN}else if(48===t){switch(d.charCodeAt(1)){case 66:case 98:i=2,s=49;break;case 79:case 111:i=8,s=55;break;default:return+d}for(r=d.slice(2),o=r.length,n=0;n<o;n++)if(l=r.charCodeAt(n),l<48||l>s)return NaN;return parseInt(r,i)}return+d};if(r(v,!y(" 0o1")||!y("0b1")||y("+0x1"))){for(var w,O=function(e){var t=arguments.length<1?0:e,a=this;return a instanceof O&&(k?u((function(){g.valueOf.call(a)})):l(a)!=v)?d(new y(I(t)),a,O):I(t)},L=i?f(y):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),j=0;L.length>j;j++)n(y,w=L[j])&&!n(O,w)&&m(O,w,h(y,w));O.prototype=g,g.constructor=O,o(s,v,O)}},"5d6cd":function(e,t,a){var i=a("1775"),s=a("1ed8");e.exports=function(e,t,a){var r,o;return s&&"function"==typeof(r=t.constructor)&&r!==a&&i(o=r.prototype)&&o!==a.prototype&&s(e,o),e}},"6b45":function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"clearfix"},[a("a-upload",{attrs:{listType:"picture-card",fileList:e.fileList,showUploadList:!0,action:"/api/image/upload"},on:{preview:e.handlePreview,change:e.handleChange}},[e.fileList.length<e.pictureLength?a("div",[a("a-icon",{attrs:{type:"plus"}}),a("div",{staticClass:"ant-upload-text"},[e._v(e._s(e.placeholder))])],1):e._e()]),a("a-modal",{attrs:{visible:e.previewVisible,footer:null},on:{cancel:e.handleCancel}},[a("img",{staticStyle:{width:"100%"},attrs:{alt:"example",src:e.previewImage}})])],1)},s=[],r=(a("7b25"),a("e201"),a("49cb"),a("3093"),a("3660")),o=(a("43a3"),a("1b2f")),n=(a("59f8"),a("c847")),l=(a("f753"),{name:"UploadImage",components:{"a-upload":n["a"],"a-modal":o["a"],"a-icon":r["a"]},props:{pictureLength:{type:Number,default:1},placeholder:{type:String,default:"上传图片"}},data:function(){return{previewVisible:!1,previewImage:"",fileList:[],remoteUrl:"",uploadedList:[]}},methods:{handleCancel:function(){this.previewVisible=!1},handlePreview:function(e){this.previewImage=e.url||e.thumbUrl,this.previewVisible=!0},handleChange:function(e){var t=e.fileList;this.fileList=t;for(var a=[],i=0;i<this.fileList.length;i++)if(t[i].status&&"done"===t[i].status){if(0!==t[i].response.resultCode)return this.$message.success(this.fileList[i].response.resultMessage),!1;a.push(this.fileList[i].response.data.path),-1===this.uploadedList.indexOf(this.fileList[i].uid)&&(this.uploadedList.push(this.fileList[i].uid),this.$message.success("图片上传成功!"),this.$emit("uploaded",a.join(",")))}}}}),d=l,c=(a("1b11"),a("4e82")),u=Object(c["a"])(d,i,s,!1,null,null,null);t["a"]=u.exports},"8a6c":function(e,t,a){"use strict";a.r(t);a("dca8"),a("3bb9"),a("6c01");var i=a("3159"),s=(a("2ccf"),a("d175")),r=(a("43a3"),a("1b2f")),o=(a("e8fa"),a("eef3")),n=a("2905"),l=a("6852"),d=a("ff2b"),c=a("3840"),u=a("dad6"),p=a("ace7"),f=a("d11d"),h=a("e3fb"),m=function(e){function t(){var e;return Object(n["a"])(this,t),e=Object(d["a"])(this,Object(c["a"])(t).apply(this,arguments)),e.filterParams={name:"",address:[],createtime:[],startTime:"",endTime:""},e.BackParams={code:"data.resultCode",codeOK:0,message:"data.resultMessage",data:"data.data",total:"data.total"},e.outParams={},e.filterList=[{key:"name",label:"学生姓名",type:"input",placeholder:"请输入学生姓名"},{key:"createtime",label:"Createtime",type:"datetimerange",placeholder:["开始时间","结束时间"],value:["startTime","endTime"]}],e.tableList=[{title:"ID",dataIndex:"id"},{title:"学生作品",dataIndex:"url",customRender:e.thumbnailRender},{title:"作品描述",dataIndex:"desc"},{title:"所属学生",dataIndex:"name"},{title:"分类",dataIndex:"category"},{title:"标签",dataIndex:"tags",customRender:e.tagsRender},{title:"排序权重",dataIndex:"order"},{title:"上传时间",dataIndex:"created_at"},{title:"修改时间",dataIndex:"updated_at"}],e.opreat=[{key:"edit",rowKey:"id",color:"blue",text:"编辑",roles:!0,popconfirm:!1},{key:"delete",rowKey:"id",color:"red",text:"删除",roles:!0,msg:"确定删除？"}],e.changeVis=!1,e.detailVis=!1,e.title="新增学生作品",e.visible=!1,e.modelType="add",e.editData={},e.dataSource=[],e.openType="",e.type="",e}return Object(u["a"])(t,e),Object(l["a"])(t,[{key:"handleOk",value:function(){this.detailVis=!0}},{key:"thumbnailRender",value:function(e){var t=this.$createElement;return console.log(e),e?t("img",{attrs:{src:e},class:"thumbnail-image"}):t("a-tag",{attrs:{color:"red"}},["无"])}},{key:"tagsRender",value:function(e){var t=this.$createElement,a=e.split("-"),i=["green","blue","cyan","pink","purple","orange"],s=a.map((function(e,a){var s=Math.floor(6*Math.random());return t("a-tag",{key:Math.random()+a,attrs:{color:i[s]}},[e])}));return s}},{key:"device",value:function(e){var t=this.$createElement;return 0===e?t("a-tag",{attrs:{color:"green"}},["手机"]):t("a-tag",{attrs:{color:"blue"}},["PC"])}},{key:"handleCancel",value:function(){this.detailVis=!1}},{key:"tableClick",value:function(e,t){var a=this,i=JSON.parse(JSON.stringify(t));switch(this.type=t.type,e){case"edit":this.editData=i,this.visible=!0,this.title="编辑学生作品",this.type="edit";break;case"delete":window.api.studentWorksDelete({id:t.id}).then((function(e){var t=e.data.resultCode;0===t?(a.$message.success("删除成功"),a.success()):a.$message.error("删除失败")}));break;default:break}}},{key:"add",value:function(){this.title="新增学生作品",this.type="add",this.visible=!0,this.editData={}}},{key:"closeModal",value:function(){this.visible=!1,this.editData={}}},{key:"success",value:function(){this.visible=!1;var e=this.$refs.baseInfoTable;this.editData={},e.reloadTable()}},{key:"render",value:function(){var e=arguments[0];return e("div",{class:"baseInfo-wrap"},[e("filter-table",{ref:"baseInfoTable",attrs:{tableList:this.tableList,filterList:this.filterList,filterGrade:[],scroll:{x:900},url:"/studentWorks/studentWorksList",filterParams:this.filterParams,outParams:this.outParams,localName:"StudentWorks",addBtn:!0,exportBtn:!1,opreatWidth:"120px",dataType:"json",rowKey:"id",opreat:this.opreat,fetchType:"post",backParams:this.BackParams},on:{menuClick:this.tableClick,add:this.add}}),this.visible?e("info-modal",{on:{close:this.closeModal,success:this.success},attrs:{data:this.editData,type:this.type,title:this.title,visible:this.visible}}):""])}}]),t}(f["d"]);m=p["a"]([Object(f["a"])({name:"studentWorks",components:{"a-tag":o["a"],"info-modal":h["default"],"a-modal":r["a"],"a-button":s["a"],"a-table":i["a"]}})],m),t["default"]=m},"98ac":function(e,t,a){},a41e:function(e,t,a){},e3fb:function(e,t,a){"use strict";a.r(t);a("0aa0"),a("0943"),a("b488"),a("1e85"),a("f5f0"),a("89f7"),a("1d14"),a("eb0f");var i=a("6980"),s=(a("05e4"),a("40a0")),r=(a("b405"),a("0d4d")),o=(a("9961"),a("1000")),n=(a("565b"),a("f2a3")),l=(a("2ccf"),a("d175")),d=(a("342f"),a("b483")),c=(a("953a"),a("a793")),u=(a("43a3"),a("1b2f")),p=a("f010"),f=a("2905"),h=a("6852"),m=a("ff2b"),b=a("3840"),v=a("dad6"),y=a("ace7"),g=a("d11d"),k=a("6b45");a("a41e");function I(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,i)}return a}function w(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?I(Object(a),!0).forEach((function(t){Object(p["a"])(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):I(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var O=function(e){function t(){var e;return Object(f["a"])(this,t),e=Object(m["a"])(this,Object(b["a"])(t).apply(this,arguments)),e.editorOption={},e.formItemLayout={labelCol:{xs:{span:24},sm:{span:4}},wrapperCol:{xs:{span:24},sm:{span:20}}},e.spinShow=!1,e.thumbnail="",e.url="",e.contentHTML="",e}return Object(v["a"])(t,e),Object(h["a"])(t,[{key:"created",value:function(){this.url=this.data.url}},{key:"submit",value:function(){var e=this;if(""===this.url)return this.$message.info("你还未选择任何图片!"),!1;this.data.result&&(this.spinShow=!0),this.$props.Form.validateFields((function(t,a){t||("edit"===e.type?window.api.studentWorksUpdate(w({},a,{id:e.data.id,url:e.url,status:1})).then((function(t){e.spinShow=!1;var a=t.data,i=a.resultCode,s=a.resultMessage;i?e.$message.error(s):(e.$message.success(s),e.Form.resetFields(),e.$emit("success"))})):"add"===e.type&&window.api.studentWorksAdd(w({},a,{url:e.url})).then((function(t){e.spinShow=!1;var a=t.data,i=a.resultCode,s=a.resultMessage;i?e.$message.error(s):(e.$message.success(s),e.Form.resetFields(),e.$emit("success"))})))}))}},{key:"cancel",value:function(){this.$emit("close")}},{key:"uploaded",value:function(e){this.url=e}},{key:"onChange1",value:function(e){this.data.status=e.target.value}},{key:"render",value:function(){var e=arguments[0],t=this.Form.getFieldDecorator;return e("a-modal",{attrs:{width:"650px",title:this.title,visible:this.visible},on:{ok:this.submit,cancel:this.cancel}},[e("a-form",["edit"===this.type?e("a-form-item",{props:w({},this.formItemLayout),attrs:{label:"作品图片"}},[e("img",{attrs:{src:this.url,width:"80%"}})]):"",e("a-form-item",{props:w({},this.formItemLayout),attrs:{label:"edit"===this.type?"更换图片":"上传图片"}},[e("div",[e("upload-image",{on:{uploaded:this.uploaded}})])]),e("a-form-item",{props:w({},this.formItemLayout),attrs:{label:"作品分类"}},[t("category",{initialValue:this.data.category})(e("a-input",{attrs:{placeholder:"请输入分类"}}))]),e("a-form-item",{props:w({},this.formItemLayout),attrs:{label:"学生姓名"}},[t("name",{initialValue:this.data.name})(e("a-input",{attrs:{placeholder:"请输入学生姓名"}}))]),e("a-form-item",{props:w({},this.formItemLayout),attrs:{label:"作品标签"}},[t("tags",{initialValue:this.data.tags})(e("a-input",{attrs:{placeholder:"多个标签以 - (横杠) 分开"}}))]),e("a-form-item",{props:w({},this.formItemLayout),attrs:{label:"排序权重"}},[t("order",{initialValue:this.data.order})(e("a-input",{attrs:{placeholder:"数值越大排序越靠前"}}))]),e("a-form-item",{props:w({},this.formItemLayout),attrs:{label:"作品描述"}},[t("desc",{initialValue:this.data.desc})(e("a-textarea",{attrs:{rows:6,placeholder:"请输入描述"}}))])])])}}]),t}(g["d"]);y["a"]([Object(g["c"])()],O.prototype,"title",void 0),y["a"]([Object(g["c"])()],O.prototype,"visible",void 0),y["a"]([Object(g["c"])()],O.prototype,"type",void 0),y["a"]([Object(g["c"])()],O.prototype,"data",void 0),O=y["a"]([Object(g["a"])({components:{"a-modal":u["a"],"a-form":c["a"],"a-form-item":c["a"].Item,"a-input":d["a"],"a-button":l["a"],"a-input-number":n["a"],"a-radio":o["a"],"a-radio-group":o["a"].Group,"a-date-picker":r["a"],"a-cascader":s["a"],"a-textarea":d["a"].TextArea,"a-spin":i["a"],UploadImage:k["a"]},props:{Form:c["a"]}})],O),t["default"]=c["a"].create({props:{title:String,visible:Boolean,type:String,data:Object}})(O)}}]);
//# sourceMappingURL=chunk-a4b9f7da.406ae956.js.map