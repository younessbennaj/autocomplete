export default function textSearch(text: string, query: string) {
    const arr = text.split('').map(() => false)
    const lowerQuery = query.toLocaleLowerCase()
 
     let start = 0;
     let end = lowerQuery.length - 1 
     let currentWordParsed = false
     
     while(end < text.length) {

        if(text[start] === ' ') {
            currentWordParsed = false
            start++
            end++
            continue
        }

         const sliced = text.toLocaleLowerCase().slice(start, end + 1)
 
         if(sliced === lowerQuery && !currentWordParsed) {
             arr.fill(true, start, end + 1)
             currentWordParsed = true
         }
         
         start++
         end++
     }
 
     let highlightedArray = []

     let temp = ''
 
     for(let i = 0; i < text.length; i++) {
        if(arr[i] && (i === 0 || !arr[i - 1]) && i > 0) {
            highlightedArray.push({ text: temp, highlight: false })
            temp = ''
        }

        if(!arr[i] && i > 0 && arr[i - 1]) {
            highlightedArray.push({ text: temp, highlight: true })
            temp = ''
        }
 
        temp = temp + text[i]
     }

    highlightedArray.push({ text: temp, highlight: false })

    console.log(highlightedArray)
      
     return highlightedArray
 }