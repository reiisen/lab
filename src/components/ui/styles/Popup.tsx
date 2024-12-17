export const _popup_content = `
  w-1/5
  transition-all duration-300 ease-out
  fixed flex flex-col bg-white rounded-lg p-6
  left-1/2 top-1/2
  -translate-x-1/2 -translate-y-1/2
  scale-50
  opacity-0
  data-[state=open]:scale-100
  data-[state=open]:opacity-100
`;
export const _popup_overlay = `
  fixed
  left-0 top-0
  h-[3000px] w-[3000px]
  -translate-x-1 -translate-y-1
  backdrop-blur-[5px] backdrop-brightness-75
  data-[state=open]:animate-openBackdrop
  data-[state=closed]:animate-closeBackdrop
`;
export const _popup_x = `
  border
  bg-neutral-300
  rounded-lg
  p-1
  hover:brightness-75
  transition-all
`;

export const _popup_header = `
  flex
  justify-between
  border-b
  mb-5
  pb-3
`;

export const _popup_title = `
  text-xl
  font-bold
  text-neutral-700
`
