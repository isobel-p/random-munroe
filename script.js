// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint;

// create an engine
var engine = Engine.create();
world = engine.world;

let w = window.innerWidth;
let h = window.innerHeight;

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: w,
        height: h,
        showAngleIndicator: true,
    }
});

Composite.add(world, [
    // walls!
    Bodies.rectangle(5, h/2, 10, h, {isStatic: true}),
    Bodies.rectangle(w-5, h/2, 10, h, {isStatic: true}),
    Bodies.rectangle(w/2, 5, w, 10, {isStatic: true}),
    Bodies.rectangle(w/2, h-5, w, 10, {isStatic: true}),

    // test blocks
    Bodies.rectangle(w/2, h/2, 100, 100),
    Bodies.rectangle(w/2, h/2, 100, 100),
    Bodies.rectangle(w/2, h/2, 100, 100),
    Bodies.rectangle(w/2, h/2, 100, 100),
])

// add mouse control
var mouse = Mouse.create(render.canvas)
var mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.1,
            render: {
                visible: false
            }
        }
    });

Composite.add(world, mouseConstraint);

// keep the mouse in sync with rendering
render.mouse = mouse;

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);