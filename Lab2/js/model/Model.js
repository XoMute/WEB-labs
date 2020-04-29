export default class Model {

    constructor() {
        this.clear();
    }

    insert(value) {
        this.expression += value;
    }

    operation(value) {
        if (this.first == null || this.first == NaN) {
            if (this.expression) {
                this.first = parseFloat(this.expression);
                this.expression = '';
            }
        } else {
            if (this.op) {
                if (!this.second) {
                    if (this.expression) {
                        this.second = parseFloat(this.expression);
                        this.expression = '';
                        this.calculate();
                    }                    
                }
            } else {
                this.first = parseFloat(this.first + this.expression);
                this.expression = '';
            }
        }
        this.op = value;
    }

    calculate() {
        if (this.firstIsCorrect()) {
            if (!this.second && this.expression) {
                this.second = parseFloat(this.expression);
                this.expression = '';
            }
            if (this.secondIsCorrect()) {
                switch (this.op) {
                    case '+':
                        this.first += this.second;
                        break;
                    case '-':
                        this.first -= this.second;
                        break;
                    case '*':
                        this.first *= this.second;
                        break;
                    case '/':
                        if (this.second == 0) {
                            this.error = 'Sorry, but you can\'t';
                        } else {
                            this.first /= this.second;
                        }
                        break;
                    case '^':
                        this.first = Math.pow(this.first, this.second);
                        break;
                }
                this.op = null;
                this.second = null;
            }
        }
    }

    clear() {
        this.expression = '';
        this.first = null;
        this.second = null;
        this.op = null;
        this.error = null;
    }

    toRender() {
        if (this.error) {
            let value = this.error;
            this.error = null;
            this.clear();
            return value;
        }
        let toRender = '';
        if (this.firstIsCorrect()) {
            toRender += this.first;

            if (this.op) {
                toRender += this.op;
            }
            if (this.secondIsCorrect()) {
                toRender += this.second;
            }
        }
        if (this.expression != null && this.expression != NaN) {
            toRender += this.expression;
        }
        return toRender;
    }

    b2d() {
        if (this.expression) {
            if (!this.firstIsCorrect()) {
                this.first = parseFloat(this.expression);
                this.expression = '';
            }
        }
        if (this.firstIsCorrect()) {
            if (this.op) {
                return null;
            }
            if (!Number.isInteger(this.first)) {
                this.error = "Ints only";
                return null;
            }
            if (Number.isNaN(parseInt(this.first, 2))) {
                this.error = "Binary only";
                return null;
            }
            let value = this.first;
            this.clear();
            return value;
        }
    }

    d2b() {
        if (this.expression) {
            if (!this.firstIsCorrect()) {
                this.first = parseFloat(this.expression);
                this.expression = '';
            }
        }
        if (this.firstIsCorrect()) {
            if (this.op) {
                return null;
            }
            if (!Number.isInteger(this.first)) {
                this.error = "Ints only";
                return null;
            }
            let value = this.first;
            this.clear();
            return value;
        }
    }

    firstIsCorrect() {
        return this.first != null && this.first != NaN;
    }

    secondIsCorrect() {
        return this.second != null && this.second != NaN;
    }
}