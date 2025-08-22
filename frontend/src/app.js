import { setupIntro } from "./intro.js";
import { setupAuth } from "./auth.js";
import { setupUI } from "./ui.js";
import { api } from "./api.js";

// contact form
function setupContact(){
  const form = document.getElementById("contactForm");
  const status = document.getElementById("contactStatus");
  form?.addEventListener("submit", async (e)=>{
    e.preventDefault();
    status.textContent="Sending…";
    const fd = new FormData(form);
    try{
      const out = await api("/contact",{method:"POST",body:JSON.stringify(Object.fromEntries(fd))});
      if (out.ok) { status.textContent="Delivered. We will reply soon."; form.reset(); }
      else throw new Error("Failed");
    }catch(err){ status.textContent=err.message || "Failed"; }
  });
}

setupUI();
setupIntro();
setupAuth();
setupContact();
