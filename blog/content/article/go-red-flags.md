---
title: "Go red flags"
date: 2019-09-20T22:43:00+03:00
featured_image: "/images/posts/red-flag.jpg"
tags: ["go", "design", "productivity"]
summary: "In this article we will address autopilot mistakes in software development so we can catch them before they break production."
toc: true
sharethis: true
---

Human brain operates on two fundamental levels. Conscience (smart but slow) and subconscious (fast but dumb). To save 
energy and time, our brain tries to operate on subconscious level most of the time. 

Actually, proficiency in most
fields is achieved by pushing as much as possible to the autopilot. That includes software development. Unfortunately,
that leads to occasional mistakes (especially when the conscience layer is actively doing something) like forgetting 
your car keys at home.

To avoid such mistakes we can use some sort of a "breakpoint" to yield execution to the conscience layer. You can create
a trigger for your brain which fires every time you leave you house simply by thinking about it. It's like developing a
new reflex. Imagine yourself passing through the door and make a conscience effort to mark that event.

In this article we will address autopilot mistakes in software development so we can catch them before they break 
production. We can pinpoint and mark dangerous constructs to attract conscience attention. Let's call these marks 
"<span style="color:#BA0000">red flags</span>".

## Returning a pointer error from a function
> Ensure that error passes a `nil` check. 

Interfaces in Go hold two values (type and underlying 
value). Interface equals `nil` only if both of them are `nil`. In this case, type of the returned `error` interface
is not `nil` because the returned variable declared as a concrete type. This behaviour is probably unexpected by users
of the function. 

{{< highlight go >}}
type CustomError struct {}

func (e *CustomError) Error() string {
	return "err"
}

func nilError() error {
	var err *CustomError = nil
	return err
}

func main() {
	fmt.Println(nilError() == nil) // false
}
{{< / highlight >}}

## Starting a goroutine with a closure
> Think what values might contain enclosed variables at the time when goroutine runs.

As the time when goroutines is not guaranteed, enclosed variable might have unexpected value.

{{< highlight go >}}
for i := 0; i < 10; i++ {
	go func() {
		// The value caught in the closure is unpredictable because 
		// iterator variable is reused during iteration. We should either
		// pass the variable as argument or use i := i to fix value for 
		// each iteration.
		fmt.Println("Iter value is ", i) 
	}()
}
{{< / highlight >}}

## Creating a buffered channel
> Consider making 0 or 1 length channel. 

There are actually very few applications for buffered channels (limiting concurrency is one of them). In most cases channel will either always be empty (reads faster than writes) or full (writes faster than reads), so there is no point in keeping a buffered channel.

## Closing a channel
> Ensure that channel closes only once. 

In situations with a possible concurrent close, channel should be protected by a sync primitive. Using `sync.Once` is a good option.

{{< highlight go >}}
type Waiter struct {
	ch chan struct{}
	once sync.Once
}

func (w *Waiter) Wait() {
	<-w.ch
}

// Release can be called by an external event. 
func (w *Waiter) Release() {
	// This is a safe option to close a channel.
	w.once.Do(func(){
		close(w.ch)
	})
}

{{< / highlight >}}

## Copying a structure
> Check for syncronization primitives defined in the structure.

New ones should be created for the new structure.

{{< highlight go >}}
type MyStruct struct {
	lock sync.Mutex
} 

// . . .

s := MyStruct{}
// The two structs now share the same mutex which is not the desired 
// result.
s2 := s
{{< / highlight >}}

## Using := in a block
> Check for existing variable with the same name in current context. 

The results of assigning are clearly [defined](https://golang.org/ref/spec#Assignments) but not always obvious.

{{< highlight go >}}
func writeNumbers(w io.Writer) error {
	_, err := w.Write([]byte{1})
	if err == nil {
		_, err := w.Write([]byte{2}) 
	}
 	
 	// The error from the second write will be lost. It might be a better
 	// idea to define the `err` variable explicitly and only use `=` 
 	// operator.
	return err
}
{{< / highlight >}}

---
If you know any more interesting gotchas which are hard to debug, please let me know in the comments.