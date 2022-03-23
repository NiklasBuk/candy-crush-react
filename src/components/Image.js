const Image = ({index, src, candyColor, draggable, dragStart, dragDrop, dragEnd}) => {
   return (
      <img
         key = {index}
         src={src}
         alt = {candyColor}
         data-id = {index}
         draggable = {draggable}
         onDragStart = {dragStart}
         onDragOver = {e => e.preventDefault()}
         onDragEnter = {e => e.preventDefault()}
         onDragLeave = {e => e.preventDefault()}
         onDrop = {dragDrop}
         onDragEnd = {dragEnd}
      />
   )
}

export default Image