"use strict";(self.webpackChunkportfolio=self.webpackChunkportfolio||[]).push([[70],{7789:function(e,n,t){t.r(n),t.d(n,{default:function(){return w}});var r={};t.r(r),t.d(r,{barsContainer16:function(){return c},barsContainer32:function(){return s},barsContainer4:function(){return m},barsContainer64:function(){return f},barsContainer8:function(){return d},li:function(){return h}});var a=t(7294),i=t(6541),o=t(7340),l=t(7031),u={type:"spring",damping:25,stiffness:150},c="SortAnimation-module--barsContainer16--9RvQa",s="SortAnimation-module--barsContainer32--mP5Hu",m="SortAnimation-module--barsContainer4--49Etq",f="SortAnimation-module--barsContainer64--FYorn",d="SortAnimation-module--barsContainer8--l6eea",h="SortAnimation-module--li--bZDfV";function S(e){var n=e.algorithm,t=e.startSorting,i=e.initialValues,o=e.previousValues,c=e.handleSortFinish,s=(0,a.useState)(i),m=s[0],f=s[1],d=(0,a.useState)([]),h=d[0],S=d[1],E=function(e){f(e)},v=function(e){S(e)};return(0,a.useEffect)((function(){if(t){var e={handleSetBars:E,handleSetTimeouts:v,handleSortFinish:c};n.sort(m,e)}else h.forEach((function(e){return clearTimeout(e)})),f(i),c(!1)}),[t,i]),a.createElement("ul",{className:r["barsContainer"+i.length]},null==m?void 0:m.map((function(e){return a.createElement(l.E.li,{key:e.id,layout:!0,custom:e.id,variants:(n=i,t=o,{previous:function(e){var n;return{height:(null===(n=t.find((function(n){return(null==n?void 0:n.id)===e})))||void 0===n?void 0:n.value)/22||0,transition:{duration:.5}}},current:function(e){var t;return{height:(null===(t=n.find((function(n){return(null==n?void 0:n.id)===e})))||void 0===t?void 0:t.value)/22||0,transition:{duration:.5}}}}),initial:"previous",animate:"current",transition:u,style:{background:e.color}});var n,t})))}var E=t(8014),v=t(9519),g=t(2982),b=t(2012),C=t(1351),k=[C.Z.brightPink,C.Z.darkPink,C.Z.brightPurple,C.Z.darkPurple],p=(0,g.Z)(Array(64)).map((function(){return(0,b.x0)()})),y="INCREASE",N="DECREASE",x="INCREASING",V="DECREASING",P=function(e){var n=function(e){switch(e){case 1:return 4;case 2:return 8;case 3:return 16;case 4:return 32;default:return 64}}(e);return(0,g.Z)(Array(n)).map((function(e,n){return{id:p[n],color:k[1],value:Math.floor(1e4*Math.random())}}))},A=function(e,n){return P(e).sort((function(e,t){return e.value<t.value?n===x?-1:1:n===x?1:-1}))},F=function(e,n){return e?E.XSV:n?E.Bg$:E.zc},z="SortPlayer-module--playerButton--i1FIn";function G(e){var n=e.variables,t=e.handlers,r=e.numberOfValues,l=n.isSortFinished,u=n.startSorting,c=n.values,s=t.handleValues,m=t.handlePreviousValues,f=t.handleStartSorting,d=t.handleNumberOfValues;return a.createElement(i.M5,null,a.createElement(o.zx,{className:z,onClick:function(){return f(!u)},colorScheme:"teal"},a.createElement(v.G,{icon:F(l,u)})),a.createElement(o.zx,{className:z,onClick:function(){f(!1),m(c),s(P(r))},colorScheme:"teal"},a.createElement(v.G,{icon:E.V$d})),a.createElement(o.zx,{className:z,onClick:function(){f(!1),m(c),s(A(r,V))},colorScheme:"teal"},a.createElement(v.G,{icon:E.eGX})),a.createElement(o.zx,{className:z,onClick:function(){f(!1),m(c),s(A(r,x))},colorScheme:"teal"},a.createElement(v.G,{icon:E.xrW})),a.createElement(o.zx,{disabled:5===r,className:z,onClick:function(){f(!1),d(y)},colorScheme:"teal"},a.createElement(v.G,{icon:E.r8p})),a.createElement(o.zx,{disabled:1===r,className:z,onClick:function(){f(!1),d(N)},colorScheme:"teal"},a.createElement(v.G,{icon:E.Kl4})))}function R(e){var n=e.algorithm,t=(0,a.useState)(!1),r=t[0],o=t[1],l=(0,a.useState)(!1),u=l[0],c=l[1],s=(0,a.useState)(3),m=s[0],f=s[1],d=(0,a.useState)([]),h=d[0],E=d[1],v=(0,a.useState)([]),g=v[0],b=v[1];(0,a.useEffect)((function(){b(null==h?void 0:h.map((function(e){return Object.assign({},e,{value:0})}))),E(P(m))}),[m]);var C=(0,a.useState)({isSortFinished:u,startSorting:r,values:h}),k=C[0],p=C[1],x={handleValues:function(e){E(e)},handlePreviousValues:function(e){b(e)},handleStartSorting:function(e){o(e)},handleNumberOfValues:function(e){switch(e){case y:f(m+1);break;case N:f(m-1)}}};return(0,a.useEffect)((function(){p({isSortFinished:u,startSorting:r,values:h})}),[u,r,h]),(0,a.useEffect)((function(){r&&o(!1)}),[n,h]),a.createElement(a.Fragment,null,a.createElement(i.xu,{className:"SortPlayer-module--cardContainer--0dejD"},a.createElement(i.xu,{className:"SortPlayer-module--animationContainer--0NpM2"},a.createElement(S,{algorithm:n,startSorting:r,initialValues:h,previousValues:g,handleSortFinish:function(e){c(e)}})),a.createElement(i.kC,{justify:"center",align:"center"},a.createElement(G,{variables:k,handlers:x,numberOfValues:m}),a.createElement(i.xu,{className:"SortPlayer-module--legendContainer--TqcEJ"},a.createElement(i.xu,{fontWeight:"semibold",as:"h4",isTruncated:!0},"Legend"),n.legend.map((function(e){return a.createElement(i.kC,{justify:"flex-start",align:"center"},a.createElement(i.xu,{style:{backgroundColor:e.color},className:"SortPlayer-module--colorPreview--DEFJN"}),e.message)}))))))}var Z=t(5593);function w(){var e=(0,a.useState)(Z.R[0]),n=e[0],t=e[1],r=(0,a.useState)(""),l=r[0],u=r[1];return a.createElement(i.xu,{as:"section"},Z.R.map((function(e){return a.createElement(o.zx,{key:e.key,colorScheme:l===e.key?"blue":"teal",size:"sm",marginRight:"1rem",onClick:function(){u(e.key),t(e)}},e.name)})),a.createElement(R,{algorithm:n}))}}}]);
//# sourceMappingURL=component---src-pages-sortings-jsx-e86af28dc5f03d7f385b.js.map