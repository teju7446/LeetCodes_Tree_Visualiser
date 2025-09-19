import { BinaryTreeNode } from './BinaryTreeNode.js'
import { getRequiredHeightAndWidth, DEFAULT_CONFIG, drawNode, connectEdges, treeConstructor }  from './treeUtils.js'

const canvas = document.querySelector('canvas');

function drawBinaryTree(root, canvasElement){
    const maxWidth = window.innerWidth;
    const maxHeight = window.innerHeight;

    canvasElement.width = maxWidth;
    canvasElement.height = maxHeight;

    const {
        requiredCanvasWidth,
        requiredCanvasHeight
    } =  getRequiredHeightAndWidth(root);

    const windowCenter = maxWidth / 2;
    const requiredWidthCenter = requiredCanvasWidth / 2;

    const xStart = windowCenter - requiredCanvasWidth;
    const xEnd = windowCenter + requiredCanvasWidth;
    const horizontalConfig = {xStart,xEnd}; 
    recursiveDrawNodes(root, canvasElement, 0.5, horizontalConfig);
}

function recursiveDrawNodes(root, canvasElement, currentLevel, horizontalConfig){
    const {xStart, xEnd} = horizontalConfig;
    const xPos = (xStart + xEnd) / 2;
    const yPos =  currentLevel * DEFAULT_CONFIG.nodeHeightSpacing;

    drawNode(root.value, canvasElement, xPos, yPos);

    if(root.left !== null){
        const leftNodeHorizontalConfig = {xStart, xEnd : xPos};
        recursiveDrawNodes(root.left, canvasElement, currentLevel + 1, leftNodeHorizontalConfig);

        connectEdges(canvasElement, 
            {
                xStart: xPos, 
                xEnd: (xStart + xPos) / 2
            },
            {
                yStart: yPos + DEFAULT_CONFIG.radius,
                yEnd: ((currentLevel + 1) * DEFAULT_CONFIG.nodeHeightSpacing) - DEFAULT_CONFIG.radius
            }
        );
    }
    if(root.right !== null){
        const rightNodeHorizontalConfig = {xStart : xPos, xEnd};
        recursiveDrawNodes(root.right, canvasElement, currentLevel + 1, rightNodeHorizontalConfig);

        connectEdges(canvasElement, 
            {
                xStart: xPos, 
                xEnd: (xPos + xEnd) / 2
            },
            {
                yStart: yPos + DEFAULT_CONFIG.radius,
                yEnd: ((currentLevel + 1) * DEFAULT_CONFIG.nodeHeightSpacing) - DEFAULT_CONFIG.radius
            }
        );
    }
}

let prevValue = '';
function init(value){
    prevValue = value;
    clearCanvas();
    const root = treeConstructor(value);
    console.log(root);
    drawBinaryTree(root, canvas);
}

function clearCanvas(){
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
}

const textarea = document.querySelector('textarea');
const applyBtn = document.querySelector('.applyBtn');
const resetBtn = document.querySelector('.resetBtn');

applyBtn.addEventListener('click', () =>{
    if(textarea.value === '') return;
    init(textarea.value);
})

resetBtn.addEventListener('click', () => {
    textarea.value = '';
    clearCanvas();
})

window.addEventListener('resize', () => {
    init(prevValue);
})
