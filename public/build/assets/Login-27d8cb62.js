import{W as x,r as u,j as e,a as p}from"./index-2a4703ec.js";import{L as m,I as i}from"./input-0b587738.js";import{C as f}from"./checkbox-6185c8ae.js";import{B as h}from"./button-77adb7fd.js";import"./index-b5cb4413.js";function C({status:l,canResetPassword:j}){const{data:t,setData:r,post:o,processing:n,errors:a,reset:c}=x({email:"",password:"",remember:!1});u.useEffect(()=>()=>{c("password")},[]);const d=s=>{s.preventDefault(),o(route("login"))};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Log in"}),e.jsxs("div",{className:"flex flex-col h-full w-full items-center justify-center",children:[l&&e.jsx("div",{className:"mb-4 font-medium text-sm text-green-600",children:l}),e.jsxs("form",{onSubmit:d,children:[e.jsxs("div",{children:[e.jsx(m,{htmlFor:"email",children:"Email"}),e.jsx(i,{id:"email",type:"text",name:"email",value:t.email,className:"mt-1 block w-full",autoComplete:"off",autoFocus:!0,onChange:s=>r("email",s.target.value)}),a.email&&e.jsx("p",{className:"text-xs text-destructive",children:a.email})]}),e.jsxs("div",{className:"mt-4",children:[e.jsx(m,{htmlFor:"email",children:"Password"}),e.jsx(i,{id:"email",type:"password",name:"password",value:t.password,className:"mt-1 block w-full",autoComplete:"current-password",onChange:s=>r("password",s.target.value)}),a.password&&e.jsx("p",{className:"text-xs text-destructive",children:a.password})]}),e.jsx("div",{className:"block mt-4",children:e.jsxs("label",{className:"flex items-center",children:[e.jsx(f,{name:"remember",checked:t.remember,onCheckedChange:s=>r("remember",!!s)}),e.jsx("span",{className:"ml-2 text-sm text-gray-600",children:"Remember me"})]})}),e.jsx("div",{className:"flex items-center justify-end mt-4",children:e.jsx(h,{size:"sm",className:"ml-4",disabled:n,children:"Log in"})})]})]})]})}export{C as default};