export const popupContent = `
  transition-all duration-300 ease-out
  fixed flex flex-col bg-neutral-100 rounded-lg p-6
  left-1/2 top-1/2
  -translate-x-1/2 -translate-y-1/2
  scale-50
  opacity-0
  data-[state=open]:scale-100
  data-[state=open]:opacity-100
`;
export const popupOverlay = `
  fixed
  left-0 top-0
  h-screen w-screen
  -translate-x-1 -translate-y-1
  backdrop-blur-[5px] backdrop-brightness-75
  data-[state=open]:animate-openBackdrop
  data-[state=closed]:animate-closeBackdrop
`;
export const popupClose = `
  absolute top-0 right-0 bg-neutral-200 w-10 h-10 rounded-lg flex items-center
  justify-center hover:brightness-75 transition-brightness duration-200
`;
