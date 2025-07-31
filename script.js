// module aliases
let Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint;

// create an engine
let engine = Engine.create();
world = engine.world;

let w = window.innerWidth;
let h = window.innerHeight;

// create a renderer
let render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: w,
        height: h,
        showAngleIndicator: true,
    }
});

let rectangles = [
    Bodies.rectangle(w/2, h/2, 100, 100),
    Bodies.rectangle(w/2, h/2, 100, 100),
    Bodies.rectangle(w/2, h/2, 100, 100),
    Bodies.rectangle(w/2, h/2, 100, 100),
]

// walls!
Composite.add(world, [
    Bodies.rectangle(5, h/2, 10, h, {isStatic: true}),
    Bodies.rectangle(w-5, h/2, 10, h, {isStatic: true}),
    Bodies.rectangle(w/2, 5, w, 10, {isStatic: true}), 
    Bodies.rectangle(w/2, h-5, w, 10, {isStatic: true}),
])


for (let i=0; i<rectangles.length; i++) {
    Composite.add(world, rectangles[i])
}

// add mouse control
let mouse = Mouse.create(render.canvas)
let mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.1,
            render: {
                visible: false
            }
        }
    });

document.addEventListener("contextmenu", function() {
    rect = Bodies.rectangle(mouse.position.x, mouse.position.y, 100, 100)
    Composite.add(world, rect)
    rectangles.push(rect)
});

Composite.add(world, mouseConstraint);

// keep the mouse in sync with rendering
render.mouse = mouse;

// run the renderer
Render.run(render);

// create runner
let runner = Runner.create();

// run the engine
Runner.run(runner, engine);


setInterval(function() {
    for (let i=0; i<rectangles.length; i++) {
        if (rectangles[i].position.y <= 100 && rectangles[i].speed < 0.01) {
            console.log(rectangles[i].position.y)
            console.log(rectangles[i].speed)
            alert("You win!\nYour score was:" + rectangles.length)
        }
    }
    console.log(rectangles[rectangles.length-1].position.y)
    // console.log(rectangles[rectangles.length-1].speed)
}, 500);
