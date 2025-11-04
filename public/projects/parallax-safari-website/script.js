const rightTree1 = document.getElementById("right-tree-1")
const leftTree2 = document.getElementById("left-tree-2")
const lion4 = document.getElementById("lion-4")
const simba5 = document.getElementById("simba-5")
const rightMiddleLion5 = document.getElementById("right-middle-lion-5")
const middleTree5 = document.getElementById("middle-tree-5")
const leftMiddleLion5 = document.getElementById("left-middle-lion-5")
const rightTree6 = document.getElementById("right-tree-6")
const middleTree7 = document.getElementById("middle-tree-6")
const rightHill8 = document.getElementById("right-hill-8")
const leftHill9 = document.getElementById("left-hill-9")
const title = document.getElementById("safari-sa")

window.addEventListener("scroll", () => {
    let value = window.scrollY;
    rightTree1.style.left = (value * 2.5) + 'px';
    leftTree2.style.left = (value * -2.5) + 'px';
    lion4.style.left = (value * -.5) + 'px';
    simba5.style.left = (value * .5) + 'px';
    title.style.marginTop = (value * .6) + 'px';
    rightMiddleLion5.style.left = (value * 0.2) + 'px';
    middleTree5.style.left = (value * -0.1) + 'px';
    leftMiddleLion5.style.left = (value * 0.2) + 'px';
    rightTree6.style.left = (value * 0.1) + 'px';
    middleTree7.style.left = (value * 0.1) + 'px';
    /*rightHill8.style.left = (value * 0.1) + 'px';
    leftHill9.style.left = (value * -0.1) + 'px';*/
})