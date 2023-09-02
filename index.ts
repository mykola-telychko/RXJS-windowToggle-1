import { timer, interval } from 'rxjs';
import { tap, windowToggle, mergeAll } from 'rxjs/operators';

// https://www.learnrxjs.io/learn-rxjs/operators/transformation/windowtoggle
// Example 1: Toggle window at increasing interval

//emit immediately then every 1s
const source = timer(0, 1000);
//toggle window on every 5
const srcInterval$ = interval(5000);
const example = source.pipe(
  //turn window on every 5s
  windowToggle(srcInterval$, (val) => interval(val * 1000)),
  tap((_) => console.log('NEW WINDOW!'))
);

const subscribeTwo = example
  .pipe(
    //window emits nested observable
    mergeAll()
  )
  .subscribe((val) => console.log(val));
/*
            output:
            "NEW WINDOW!"
            5
            "NEW WINDOW!"
            10
            11
            "NEW WINDOW!"
            15
            16
            "NEW WINDOW!"
            20
            21
            22
*/
