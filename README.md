**Answers to Questions**

1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

**Ans.** : 
**i.** **getElementById()**

- Selects element by **id only**
- Returns **single element**
- Returns `null` if not found
- Faster because it searches by unique id

**ii.** **getElementsByClassName()**

- Selects elements by **class name**
- Returns **HTMLCollection**
- Does not support `forEach()`

**iii.** **querySelector()**

- Selects element using **CSS selector** (id, class, tag)
- Returns **first matching element**
- Returns `null` if not found
- More flexible than getElementById

**iv.** **querySelectorAll()**

- Selects elements using **CSS selector**
- Returns **NodeList**
- Supports `forEach()`

---

### **Differences :**

| Method | Selector Type | Returns |
| --- | --- | --- |
| getElementById | id only | Single Element |
| getElementsByClassName | class only | HTMLCollection  |
| querySelector | CSS selector | First Element |
| querySelectorAll | CSS selector | NodeList  |


2. How do you create and insert a new element into the DOM?

Ans: 
1. Create the element → `createElement()`
2. Add content or attributes
3. Insert it into the DOM → `appendChild()` 

```jsx
// Select parent element
const div = document.getElementById('CardDiv');

// Create element 
let newPara = document.createElement('p');
// Add text to the content 
newPara.innerText = 'This is new paragraph.';
// Insert a new element into the DOM
div.appendChild(newPara);
```

3. What is Event Bubbling? And how does it work?

Ans : **Event Bubbling হলো এমন একটা process যেখানে যে element-এ event ঘটেছে (target element) সেই element থেকে শুরু করে event টা ধীরে ধীরে তার parent elements এর দিকে উঠে যায় DOM tree-তে।**

**In HTML :**
```
<divid="parent">
	<buttonid="child">Click Me</button>
</div>
```

**In JS :**

```jsx
document.getElementById("child").addEventListener("click",function() {
    console.log("Button clicked");
});

document.getElementById("parent").addEventListener("click",function() {
    console.log("Div clicked");
});
```


4. What is Event Delegation in JavaScript? Why is it useful?

Ans : **Event Delegation হলো একটি technique যেখানে আমরা parent element এ event listener attach করি, এবং তারপর child elements এ ঘটানো events handle করি।**

```jsx
constcontainer=document.getElementById("buttonContainer");

container.addEventListener("click",function(e) {
    if(e.target.classList.contains("btn")) {
        console.log(e.target.innerText);
  }
});
```
Why is it useful?

Memory Efficient: একাধিক child element এ listener attach করতে হয় না → memory save হয়।

Dynamic Elements: পরে নতুন child element add করলে আলাদা listener লাগানোর দরকার নেই।

Simpler Code: Cleaner and maintainable code, less repetition.

5. What is the difference between preventDefault() and stopPropagation() methods?

Ans : 
preventDefault() vs stopPropagation()

**i** preventDefault()

এটা ব্যবহার করলে element এর default behavior বন্ধ হয়ে যায়।

```jsx
document.getElementById("link").addEventListener("click", function(e){
	e.preventDefault(); 
});
```

**ii** stopPropagation()

child element-এ click করলে event parent element পর্যন্ত পৌঁছাবে না।


একটি button click করলে parent div-এর click listener না চলানো

```jsx
document.getElementById("child").addEventListener("click", function(e){
	e.stopPropagation(); 
});

```
