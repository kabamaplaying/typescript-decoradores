function sampleClassDecorator(constructor: Function) {
}

@sampleClassDecorator
class Sample {
}

// function sampleMethodDecoratorMethod(target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
// }

// class SampleMethod {
//     @sampleMethodDecoratorMethod 
//     f() {
//     }
// }

function samplePropertyDecorator(target: Object, propertyKey: string | symbol) {
}

class SampleProperty {
    @samplePropertyDecorator
    x: number;
}

function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    // keep a reference to the original function
    const originalValue = descriptor.value;

    // Replace the original function with a wrapper
    descriptor.value = function (...args: any[]) {
        console.log(`=> ${propertyKey}(${args.join(", ")})`);

        // Call the original function
        var result = originalValue.apply(this, args);

        console.log(`<= ${result}`);
        return result;
    }
}
/**  Este Decorador recibe una funcion de una clase la cual
 * soperta un solo parametro, pero lo mejora permitiendo que reciba mas 
 * de un parametro
*/
function memoization(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalValue = descriptor.value;
    const cache = new Map<any, any>();

    descriptor.value = function (arg: any) { // we only support one argument
        if (cache.has(arg)) {
            return cache.get(arg);
        }

        // call the original function
        var result = originalValue.apply(this, [arg]);
        // cache the result
        cache.set(arg, result);
        return result; 
    }
}

class SampleFactorial {
  
    @memoization
    @log
    static factorial(n: number): number {
        if (n <= 1) {
            return 1;
        }

        return n * this.factorial(n - 1);
    }
}

console.log(`3! = ${SampleFactorial.factorial(3)}`);
console.log(`4! = ${SampleFactorial.factorial(4)}`);
