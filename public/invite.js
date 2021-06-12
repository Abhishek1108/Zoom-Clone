let invitePeopleButton=document.querySelector('.invite-people');


invitePeopleButton.addEventListener("click",copyInviteLInk);

function copyInviteLInk(){
   
    let inivteModal=document.createElement("div");
    inivteModal.classList.add('invite-modal');
    inivteModal.innerHTML=`<input type="text" class="invite-input">`;
    zoomContent.append(inivteModal);
    let locationComps = location.href;
      console.log(locationComps);
    let inviteInput=document.querySelector('.invite-input');
    inviteInput.value=locationComps;
}