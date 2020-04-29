export default class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        document.getElementById("0").addEventListener("click", () => this.update(0));
        document.getElementById("1").addEventListener("click", () => this.update(1));
        document.getElementById("2").addEventListener("click", () => this.update(2));
        document.getElementById("3").addEventListener("click", () => this.update(3));
        document.getElementById("4").addEventListener("click", () => this.update(4));
        document.getElementById("5").addEventListener("click", () => this.update(5));
        document.getElementById("6").addEventListener("click", () => this.update(6));
        document.getElementById("7").addEventListener("click", () => this.update(7));
        document.getElementById("8").addEventListener("click", () => this.update(8));
        document.getElementById("9").addEventListener("click", () => this.update(9));
        document.getElementById("comma").addEventListener("click", () => this.update('.'));

        document.getElementById("plus").addEventListener("click", () => { this.model.operation('+'); this.view.render(this.model.toRender());});
        document.getElementById("minus").addEventListener("click", () => { this.model.operation('-'); this.view.render(this.model.toRender());});
        document.getElementById("multiply").addEventListener("click", () => { this.model.operation('*'); this.view.render(this.model.toRender());});
        document.getElementById("divide").addEventListener("click", () => { this.model.operation('/'); this.view.render(this.model.toRender());});
        document.getElementById("pow").addEventListener("click", () => { this.model.operation('^'); this.view.render(this.model.toRender());});
        
        document.getElementById("clear").addEventListener("click", () => { this.model.clear(); this.view.render(this.model.toRender()); });
        document.getElementById("equals").addEventListener("click", () => { this.model.calculate(); this.view.render(this.model.toRender()); });
    
        document.getElementById("b2d").addEventListener("click", () => { this.worker.postMessage({op: 'b2d', value: this.model.b2d()}); this.view.render(this.model.toRender());});
        document.getElementById("d2b").addEventListener("click", () => { this.worker.postMessage({op: 'd2b', value: this.model.d2b()}); this.view.render(this.model.toRender());});
    
        this.worker = new Worker('js/worker.js');
        this.worker.onmessage = (value) => {
            if (value.data != null && value.data != undefined && value.data != NaN) {
                this.model.expression = value.data;
                this.view.render(this.model.toRender());
            }
        }
    }

    update(value) {
        this.model.insert(value);
        this.view.render(this.model.toRender());
    }

}
