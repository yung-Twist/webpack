// import '@babel/polyfill'
const sum = (a, b)=>{return a + b}
// eslint-disable-next-line
console.log(sum(2, 4));

const promise = new Promise(resolve=>{
  setTimeout(() => {
      console.log(123)
      resolve()
  }, 1000);
})
