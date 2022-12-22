(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7020],{754:function(e,r,t){"use strict";t.d(r,{Z:function(){return N}});var n=t(3366),a=t(7462),i=t(7294),s=t(6010),o=t(4780),l=t(917),c=t(6622),d=t(5959),u=t(7074),h=t(1588),v=t(4867);function f(e){return(0,v.Z)("MuiCircularProgress",e)}(0,h.Z)("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);var m=t(5893);let x=["className","color","disableShrink","size","style","thickness","value","variant"],g=e=>e,p,Z,k,y,S=(0,l.F4)(p||(p=g`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`)),b=(0,l.F4)(Z||(Z=g`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -125px;
  }
`)),C=e=>{let{classes:r,variant:t,color:n,disableShrink:a}=e,i={root:["root",t,`color${(0,c.Z)(n)}`],svg:["svg"],circle:["circle",`circle${(0,c.Z)(t)}`,a&&"circleDisableShrink"]};return(0,o.Z)(i,f,r)},P=(0,u.ZP)("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver(e,r){let{ownerState:t}=e;return[r.root,r[t.variant],r[`color${(0,c.Z)(t.color)}`]]}})(({ownerState:e,theme:r})=>(0,a.Z)({display:"inline-block"},"determinate"===e.variant&&{transition:r.transitions.create("transform")},"inherit"!==e.color&&{color:(r.vars||r).palette[e.color].main}),({ownerState:e})=>"indeterminate"===e.variant&&(0,l.iv)(k||(k=g`
      animation: ${0} 1.4s linear infinite;
    `),S)),_=(0,u.ZP)("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(e,r)=>r.svg})({display:"block"}),j=(0,u.ZP)("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver(e,r){let{ownerState:t}=e;return[r.circle,r[`circle${(0,c.Z)(t.variant)}`],t.disableShrink&&r.circleDisableShrink]}})(({ownerState:e,theme:r})=>(0,a.Z)({stroke:"currentColor"},"determinate"===e.variant&&{transition:r.transitions.create("stroke-dashoffset")},"indeterminate"===e.variant&&{strokeDasharray:"80px, 200px",strokeDashoffset:0}),({ownerState:e})=>"indeterminate"===e.variant&&!e.disableShrink&&(0,l.iv)(y||(y=g`
      animation: ${0} 1.4s ease-in-out infinite;
    `),b)),w=i.forwardRef(function(e,r){let t=(0,d.Z)({props:e,name:"MuiCircularProgress"}),{className:i,color:o="primary",disableShrink:l=!1,size:c=40,style:u,thickness:h=3.6,value:v=0,variant:f="indeterminate"}=t,g=(0,n.Z)(t,x),p=(0,a.Z)({},t,{color:o,disableShrink:l,size:c,thickness:h,value:v,variant:f}),Z=C(p),k={},y={},S={};if("determinate"===f){let b=2*Math.PI*((44-h)/2);k.strokeDasharray=b.toFixed(3),S["aria-valuenow"]=Math.round(v),k.strokeDashoffset=`${((100-v)/100*b).toFixed(3)}px`,y.transform="rotate(-90deg)"}return(0,m.jsx)(P,(0,a.Z)({className:(0,s.Z)(Z.root,i),style:(0,a.Z)({width:c,height:c},y,u),ownerState:p,ref:r,role:"progressbar"},S,g,{children:(0,m.jsx)(_,{className:Z.svg,ownerState:p,viewBox:"22 22 44 44",children:(0,m.jsx)(j,{className:Z.circle,style:k,ownerState:p,cx:44,cy:44,r:(44-h)/2,fill:"none",strokeWidth:h})})}))});var N=w},2722:function(e,r,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/challenges/[challengeFolder]/[challengeFile]/[challengeId]",function(){return t(9609)}])},9609:function(e,r,t){"use strict";t.r(r),t.d(r,{__N_SSG:function(){return f},default:function(){return m}});var n=t(5893),a=t(1767),i=t(1953),s=t(754),o=t(9630),l=t(5084),c=t(9713),d=t(9516),u=t(7294),h=t(9328),v=t(1163),f=!0;function m(e){(0,v.useRouter)();let{setChallengeCode:r,testsResults:t,error:f,isSuccessfullyTested:m,runTests:x}=function(e){var r;let[t,n]=(0,u.useState)(null==e?void 0:null===(r=e.challenge)||void 0===r?void 0:r.code),[a,i]=(0,u.useState)(),[s,o]=(0,u.useState)(),l=a&&a.passedTests>0&&a.passedTests===a.totalTests;return(0,u.useEffect)(()=>{o(""),i(void 0)},[e.challenge]),{setChallengeCode:n,testsResults:a,error:s,isSuccessfullyTested:l,runTests:function(){o(""),i(void 0);try{var r;h.O.run(t,null==e?void 0:null===(r=e.challenge)||void 0===r?void 0:r.testsCode).then(e=>{i(e)}).catch(e=>{o("".concat(e.name,": ").concat(e.message))})}catch(n){n instanceof Error&&(console.log(n.name),o("".concat(n.name,": ").concat(n.message)))}}}}(e),g=c.i.use.editorTheme();return e.challenge?(0,n.jsxs)("div",{children:[(0,n.jsx)(o.Z,{variant:"h1",color:"textPrimary",sx:{my:4},children:e.challenge.title}),(0,n.jsx)(o.Z,{variant:"body1",color:"textPrimary",sx:{my:4,whiteSpace:"pre-line"},children:e.challenge.description}),(0,n.jsx)(a.Z,{value:e.challenge.code,onChange:r,theme:g}),(0,n.jsx)(l.Z,{sx:{my:4},variant:"contained",onClick:x,children:"Test it"}),f&&(0,n.jsx)(o.Z,{variant:"body1",color:"error.main",children:f}),m&&(0,n.jsx)(o.Z,{variant:"body1",color:"textSecondary",sx:{mb:3},children:"Congratulations! You passed all tests!"}),t&&(0,n.jsx)(d.Z,{...t})]}):(0,n.jsx)(i.Z,{sx:{display:"flex",justifyContent:"center",alignItems:"center",mt:10},children:(0,n.jsx)(s.Z,{})})}},1163:function(e,r,t){e.exports=t(880)}},function(e){e.O(0,[5482,9604,2031,9774,2888,179],function(){return e(e.s=2722)}),_N_E=e.O()}]);