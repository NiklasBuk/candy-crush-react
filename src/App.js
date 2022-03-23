/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import ScoreBoard from './components/ScoreBoard'
import Image from './components/Image'
import Candy1 from './images/candy1.png'
import Candy2 from './images/candy2.png'
import Candy3 from './images/candy3.png'
import Candy4 from './images/candy4.png'
import Candy5 from './images/candy5.png'
import Candy6 from './images/candy6.png'
import blank from './images/blank.png'

const width = 8
const candyColors = [
   Candy1,
   Candy2,
   Candy3,
   Candy4,
   Candy5,
   Candy6
]

const App = () => {
   const [currentColorArrangement, setCurrentColorArrangement] = useState([])
   const [squareBeingDragged, setSquareBeingDragged] = useState(null)
   const [squareBeingReplaced, setSquareBeingReplaced] = useState(null)
   const [scoreDisplay, setScoreDisplay] = useState(0)



   const checkForRowOfFive = () => {
      for (let i = 0; i < 64; i++) {
         const rowOfFour = [i, i + 1, i + 2, i + 3, i + 4]
         const decidedColor = currentColorArrangement[i]
         const isBlank = currentColorArrangement[i] === blank
         const notValid = [
            3, 5, 6, 7, 12, 13, 14, 15, 20, 21, 22, 23, 28, 29, 30, 31, 36, 37, 38, 39, 44, 45, 46, 47, 52, 53, 54, 55, 61, 62, 63, 64
         ]

         if (notValid.includes(i)) continue

         if (rowOfFour.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
            setScoreDisplay(score => score + 5)
            rowOfFour.forEach(square => currentColorArrangement[square] = blank)
            
            return true
         }
      }
   }

   const checkForColumnOfFive = () => {
      for (let i = 0; i <= 31; i++) {
         const columnOfFour = [i, i + width, i + width * 2, i + width * 3, i + width * 4]
         const decidedColor = currentColorArrangement[i]
         const isBlank = currentColorArrangement[i] === blank

         if (columnOfFour.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
            setScoreDisplay((score => score + 5))
            columnOfFour.forEach(square => currentColorArrangement[square] = blank)
            
            return true
         }
      }
   }

   const checkForColumnOfFour = () => {
      for (let i = 0; i <= 39; i++) {
         const columnOfFour = [i, i + width, i + width * 2, i + width * 3]
         const decidedColor = currentColorArrangement[i]
         const isBlank = currentColorArrangement[i] === blank

         if (columnOfFour.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
            setScoreDisplay(score => score + 4)
            columnOfFour.forEach(square => currentColorArrangement[square] = blank)
            
            return true
         }
      }
   }

   const checkForRowOfFour = () => {
      for (let i = 0; i < 64; i++) {
         const rowOfFour = [i, i + 1, i + 2, i + 3]
         const decidedColor = currentColorArrangement[i]
         const isBlank = currentColorArrangement[i] === blank
         const notValid = [
            5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64
         ]

         if (notValid.includes(i)) continue

         if (rowOfFour.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
            setScoreDisplay(score => score + 4)
            rowOfFour.forEach(square => currentColorArrangement[square] = blank)
            
            return true
         }
      }
   }

   const checkForColumnOfThree = () => {
      for (let i = 0; i <= 47; i++) {
         const columnOfThree = [i, i + width, i + width * 2]
         const decidedColor = currentColorArrangement[i]
         const isBlank = currentColorArrangement[i] === blank

         if (columnOfThree.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
            setScoreDisplay(score => score + 3)
            columnOfThree.forEach(square => currentColorArrangement[square] = blank)
            
            return true
         }
      }
   }

   const checkForRowOfThree = () => {
      for (let i = 0; i < 64; i++) {
         const rowOfThree = [i, i + 1, i + 2]
         const decidedColor = currentColorArrangement[i]
         const isBlank = currentColorArrangement[i] === blank
         const notValid = [
            6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64
         ]

         if (notValid.includes(i)) continue

         if (rowOfThree.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
            setScoreDisplay(score => score + 3)
            rowOfThree.forEach(square => currentColorArrangement[square] = blank)
            
            return true
         }
      }
   }



   const moveIntoSquareBelow = () => {
      for (let i = 0; i <= 55; i ++) {
         const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
         const isFirstRow = firstRow.includes(i)

         if (isFirstRow && currentColorArrangement[i] === blank) {
            const randomNumber = Math.floor(Math.random() * candyColors.length)
            currentColorArrangement[i] = candyColors[randomNumber]
         }

         if ((currentColorArrangement[i + width]) === blank) {
            currentColorArrangement[i + width] = currentColorArrangement[i]
            currentColorArrangement[i] = blank
         }
      }
   }



   const dragStart = (e) => {
      setSquareBeingDragged(e.target)
   }

   const dragDrop = (e) => {
      setSquareBeingReplaced(e.target)
   }

   const dragEnd = (e) => {
      const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id'))
      const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data-id'))

      currentColorArrangement[squareBeingDraggedId] = squareBeingReplaced.getAttribute('src')
      currentColorArrangement[squareBeingReplacedId] = squareBeingDragged.getAttribute('src')

      const validMoves = [
         squareBeingDraggedId - 1,
         squareBeingDraggedId - width,
         squareBeingDraggedId + 1,
         squareBeingDraggedId + width
      ]

      const validMove = validMoves.includes(squareBeingReplacedId)

      const isAColumnOfFive = checkForColumnOfFive()
      const isARowOfFive = checkForRowOfFive()
      const isAColumnOfFour = checkForColumnOfFour()
      const isARowOfFour = checkForRowOfFour()
      const isAColumnOfThree = checkForColumnOfThree()
      const isARowOfThree = checkForRowOfThree()

      if (squareBeingReplacedId && validMove && 
         ( isAColumnOfFive || isARowOfFive || isAColumnOfFour || isARowOfFour || isAColumnOfThree || isARowOfThree )) {
         setSquareBeingDragged(null)
         setSquareBeingReplaced(null)
      } else {
         currentColorArrangement[squareBeingReplacedId] = squareBeingReplaced.getAttribute('src')
         currentColorArrangement[squareBeingDraggedId] = squareBeingDragged.getAttribute('src')
         setCurrentColorArrangement([...currentColorArrangement])
      }

   }



   const createBoard = () => {
      const randomColorArrangement = []
      for (let i = 0; i < width * width; i++) {
         const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)]
         randomColorArrangement.push(randomColor)
      }
      setCurrentColorArrangement(randomColorArrangement)
   }



   useEffect(() => {
      createBoard()
   }, [])

   useEffect(() => {
      const timer = setInterval(() => {
         checkForColumnOfFive()
         checkForRowOfFive()
         checkForColumnOfFour()
         checkForRowOfFour()
         checkForColumnOfThree()
         checkForRowOfThree()
         moveIntoSquareBelow()
         setCurrentColorArrangement([...currentColorArrangement])
      }, 100)
      
      return () => clearInterval(timer)
   }, [checkForColumnOfFive, checkForRowOfFive, checkForColumnOfFour, checkForRowOfFour, checkForColumnOfThree, checkForRowOfThree, moveIntoSquareBelow, currentColorArrangement])



   return (
      <div className='container'>
         <div className='app'>
            <ScoreBoard score = {scoreDisplay} />
            <div className='game'>
               {currentColorArrangement.map((candyColor, index) => (
                  <Image 
                     index = {index}
                     src={candyColor}
                     draggable = {true}
                     candyColor = {candyColor}
                     dragStart = {dragStart}
                     dragDrop = {dragDrop}
                     dragEnd = {dragEnd}
                  />
               ))}
            </div>
         </div>
      </div>
   )
}

export default App