import './polyfills.server.mjs';
import{a as $,b as X,c as Y,f as Z,j as q,m as G,n as J,o as O}from"./chunk-BBUA4EYO.mjs";import{Aa as R,Ba as V,Cb as W,Ha as j,I as F,Ja as g,K as w,Ka as H,L as y,La as r,Ma as s,Na as x,Oa as z,Pa as d,Q as L,Qa as u,U as p,Ua as c,V as C,Wa as b,X as D,aa as f,ba as v,f as S,na as I,tb as U,ua as h,va as _,wa as E,xa as T,ya as B}from"./chunk-WMOJDED6.mjs";var A=(()=>{let e=class e{constructor(){this.hideNavBar=new S,this.hideNavBar$=this.hideNavBar.asObservable()}hide(){this.hideNavBar.next(!0)}};e.\u0275fac=function(t){return new(t||e)},e.\u0275prov=w({token:e,factory:e.\u0275fac,providedIn:"root"});let i=e;return i})();var Q=(()=>{let e=class e{constructor(n){this.navbarService=n}clickOpen(){alert("Button Working"),this.navbarService.hide()}};e.\u0275fac=function(t){return new(t||e)(_(A))},e.\u0275cmp=p({type:e,selectors:[["app-home"]],decls:4,vars:0,consts:[[1,"home"],[3,"click"]],template:function(t,a){t&1&&(r(0,"div",0)(1,"div")(2,"button",1),d("click",function(){return a.clickOpen()}),c(3,"Send"),s()()())}});let i=e;return i})();var ee=(()=>{let e=class e{};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=p({type:e,selectors:[["app-products"]],decls:2,vars:0,template:function(t,a){t&1&&(r(0,"p"),c(1,"products works!"),s())}});let i=e;return i})();var te=(()=>{let e=class e{};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=p({type:e,selectors:[["app-about"]],decls:2,vars:0,template:function(t,a){t&1&&(r(0,"p"),c(1,"about works!"),s())}});let i=e;return i})();var ne=(()=>{let e=class e{};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=p({type:e,selectors:[["app-contact"]],decls:2,vars:0,template:function(t,a){t&1&&(r(0,"p"),c(1,"contact works!"),s())}});let i=e;return i})();var ie=(()=>{let e=class e{};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=p({type:e,selectors:[["app-cart"]],decls:2,vars:0,template:function(t,a){t&1&&(r(0,"p"),c(1,"cart works!"),s())}});let i=e;return i})();var pe=[{path:"",component:Q},{path:"products",component:ee},{path:"about",component:te},{path:"contact",component:ne},{path:"cart",component:ie}],oe=(()=>{let e=class e{};e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=C({type:e}),e.\u0275inj=y({imports:[O.forRoot(pe),O]});let i=e;return i})();var k=()=>({exact:!0});function me(i,e){if(i&1){let o=z();r(0,"nav",1),x(1,"div",2),r(2,"div",3)(3,"a",4),d("click",function(){f(o);let t=u();return v(t.toggleMenu())}),c(4,"Home"),s(),r(5,"a",5),d("click",function(){f(o);let t=u();return v(t.toggleMenu())}),c(6,"Products"),s(),r(7,"a",6),d("click",function(){f(o);let t=u();return v(t.toggleMenu())}),c(8,"About"),s(),r(9,"a",7),d("click",function(){f(o);let t=u();return v(t.toggleMenu())}),c(10,"Contact"),s(),r(11,"a",8),d("click",function(){f(o);let t=u();return v(t.toggleMenu())}),c(12,"Cart"),s()(),r(13,"div",9),d("click",function(){f(o);let t=u();return v(t.toggleMenu())}),x(14,"span")(15,"span")(16,"span"),s()()}if(i&2){let o=u();h(2),H("active",o.menuActive),h(),g("routerLinkActiveOptions",b(7,k)),h(2),g("routerLinkActiveOptions",b(8,k)),h(2),g("routerLinkActiveOptions",b(9,k)),h(2),g("routerLinkActiveOptions",b(10,k)),h(2),g("routerLinkActiveOptions",b(11,k))}}var re=(()=>{let e=class e{constructor(n){this.navbarService=n,this.menuActive=!1,this.hideNavBar=!1}ngOnInit(){this.navbarService.hideNavBar$.subscribe(n=>{this.hideNavBar=n})}toggleMenu(){this.menuActive=!this.menuActive,console.log("hello")}};e.\u0275fac=function(t){return new(t||e)(_(A))},e.\u0275cmp=p({type:e,selectors:[["app-nav-bar"]],decls:1,vars:1,consts:[["class","navbar","fxLayout","row","fxLayoutAlign","space-between center",4,"ngIf"],["fxLayout","row","fxLayoutAlign","space-between center",1,"navbar"],[1,"navbar-brand"],[1,"navbar-menu"],["routerLink","/","routerLinkActive","active-link",3,"click","routerLinkActiveOptions"],["routerLink","/products","routerLinkActive","active-link",3,"click","routerLinkActiveOptions"],["routerLink","/about","routerLinkActive","active-link",3,"click","routerLinkActiveOptions"],["routerLink","/contact","routerLinkActive","active-link",3,"click","routerLinkActiveOptions"],["routerLink","/cart","routerLinkActive","active-link",3,"click","routerLinkActiveOptions"],[1,"navbar-burger",3,"click"]],template:function(t,a){t&1&&j(0,me,17,12,"nav",0),t&2&&g("ngIf",!a.hideNavBar)},dependencies:[W,G,J],styles:[".navbar[_ngcontent-%COMP%]{background-color:#333;color:#fff;padding:10px 20px;position:relative}.navbar[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:#fff;text-decoration:none;padding:10px}.navbar[_ngcontent-%COMP%]   a.active-link[_ngcontent-%COMP%]{color:tomato}.navbar-brand[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{font-size:1.5em}.navbar-menu[_ngcontent-%COMP%]{display:flex;gap:20px}.navbar-burger[_ngcontent-%COMP%]{display:none;cursor:pointer;flex-direction:column;gap:5px}.navbar-burger[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{background-color:#fff;height:2px;width:25px}@media (max-width: 768px){.navbar-menu[_ngcontent-%COMP%]{display:none;flex-direction:column;width:100%}.navbar-menu.active[_ngcontent-%COMP%], .navbar-burger[_ngcontent-%COMP%]{display:flex}}"]});let i=e;return i})();var N=(()=>{let e=class e{constructor(){this.title="Thikse-E-commerce"}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=p({type:e,selectors:[["app-root"]],decls:3,vars:0,consts:[[1,"container"]],template:function(t,a){t&1&&(x(0,"app-nav-bar"),r(1,"div",0),x(2,"router-outlet"),s())},dependencies:[q,re],styles:[".container[_ngcontent-%COMP%]{padding:20px;margin-top:60px}"]});let i=e;return i})();var ue="@",fe=(()=>{let e=class e{constructor(n,t,a,m,M){this.doc=n,this.delegate=t,this.zone=a,this.animationType=m,this.moduleImpl=M,this._rendererFactoryPromise=null,this.scheduler=L(T,{optional:!0})}ngOnDestroy(){this._engine?.flush()}loadImpl(){return(this.moduleImpl??import("./chunk-QG2J36YP.mjs").then(t=>t)).catch(t=>{throw new F(5300,!1)}).then(({\u0275createEngine:t,\u0275AnimationRendererFactory:a})=>{this._engine=t(this.animationType,this.doc);let m=new a(this.delegate,this._engine,this.zone);return this.delegate=m,m})}createRenderer(n,t){let a=this.delegate.createRenderer(n,t);if(a.\u0275type===0)return a;typeof a.throwOnSyntheticProps=="boolean"&&(a.throwOnSyntheticProps=!1);let m=new P(a);return t?.data?.animation&&!this._rendererFactoryPromise&&(this._rendererFactoryPromise=this.loadImpl()),this._rendererFactoryPromise?.then(M=>{let ce=M.createRenderer(n,t);m.use(ce),this.scheduler?.notify(9)}).catch(M=>{m.use(a)}),m}begin(){this.delegate.begin?.()}end(){this.delegate.end?.()}whenRenderingDone(){return this.delegate.whenRenderingDone?.()??Promise.resolve()}};e.\u0275fac=function(t){E()},e.\u0275prov=w({token:e,factory:e.\u0275fac});let i=e;return i})(),P=class{constructor(e){this.delegate=e,this.replay=[],this.\u0275type=1}use(e){if(this.delegate=e,this.replay!==null){for(let o of this.replay)o(e);this.replay=null}}get data(){return this.delegate.data}destroy(){this.replay=null,this.delegate.destroy()}createElement(e,o){return this.delegate.createElement(e,o)}createComment(e){return this.delegate.createComment(e)}createText(e){return this.delegate.createText(e)}get destroyNode(){return this.delegate.destroyNode}appendChild(e,o){this.delegate.appendChild(e,o)}insertBefore(e,o,n,t){this.delegate.insertBefore(e,o,n,t)}removeChild(e,o,n){this.delegate.removeChild(e,o,n)}selectRootElement(e,o){return this.delegate.selectRootElement(e,o)}parentNode(e){return this.delegate.parentNode(e)}nextSibling(e){return this.delegate.nextSibling(e)}setAttribute(e,o,n,t){this.delegate.setAttribute(e,o,n,t)}removeAttribute(e,o,n){this.delegate.removeAttribute(e,o,n)}addClass(e,o){this.delegate.addClass(e,o)}removeClass(e,o){this.delegate.removeClass(e,o)}setStyle(e,o,n,t){this.delegate.setStyle(e,o,n,t)}removeStyle(e,o,n){this.delegate.removeStyle(e,o,n)}setProperty(e,o,n){this.shouldReplay(o)&&this.replay.push(t=>t.setProperty(e,o,n)),this.delegate.setProperty(e,o,n)}setValue(e,o){this.delegate.setValue(e,o)}listen(e,o,n){return this.shouldReplay(o)&&this.replay.push(t=>t.listen(e,o,n)),this.delegate.listen(e,o,n)}shouldReplay(e){return this.replay!==null&&e.startsWith(ue)}};function ae(i="animations"){return R("NgAsyncAnimations"),D([{provide:B,useFactory:(e,o,n)=>new fe(e,o,n,i),deps:[U,$,V]},{provide:I,useValue:i==="noop"?"NoopAnimations":"BrowserAnimations"}])}var se=(()=>{let e=class e{};e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=C({type:e,bootstrap:[N]}),e.\u0275inj=y({providers:[Y(),ae()],imports:[X,oe]});let i=e;return i})();var ve=(()=>{let e=class e{};e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=C({type:e,bootstrap:[N]}),e.\u0275inj=y({imports:[se,Z]});let i=e;return i})();export{ve as a};
