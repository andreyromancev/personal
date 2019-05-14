---
title: "Go red flags"
draft: true
date: 2019-05-05T18:09:18+03:00
featured_image: "/images/posts/container-lock.jpg"
tags: ["go", "design"]
toc: true
sharethis: true
---

## Cognitive breakpoints

Human brain operates on two fundamental levels. Conscience (smart but slow) and subconscious (fast but dumb). To save energy and time, our brain tries to operate on subconscious level most of the time. Actually, proficiency in most fields is achieved by pushing as much as possible to the autopilot. That includes software development. Unfortunately, that leads to occasional mistakes (especially when the conscience layer is actively doing something) like forgetting your car keys at home.

To avoid such mistakes we can use some sort of a "breakpoint" to yeild execution to the conscience layer. You can create a trigger for your brain which fires every time you leave you house simply by thinking about it. It's like developing a new reflex. Imagine yourself passing through the door and make a conscience effort to mark that event.

In this article we will address autopilot mistakes in software development so we can catch them before they break production. We can pinpoint and mark dangerous constructs to attract conscience attention. Let's call these marks "red flags".

## Using := in a block
Check for existing variables with the same names in current context. The results of assigning are clearly defined [link to assigning rules] but not always obvious.

{{< highlight go >}}
func writeNumbers(w io.Writer) error {
	_, err := w.Write([]byte{1})
	if err == nil {
		_, err := w.Write([]byte{2}) 
	}
 	
 	// The error from the second write will be lost.
 	// It might be a better idea to define the `err` variable explicitly and only use `=` operator.
	return err
}
{{< / highlight >}}

## Starting a goroutine with a closure
Think what values might contain enclosed variables at the time when goroutine runs. As the time when goroutines is not guaranteed, enclosed variable might have unexpected value.

{{< highlight go >}}
for i := 0; i < 10; i++ {
	go func() {
		// The value caught here in unpredictable because iterator variable is reused for all values.
		// We should either pass the variable as argument or use i := i to fix value for each iteration.
		fmt.Println("Iter value is ", i) 
	}()
}
{{< / highlight >}}


## Creating a channel
Check (including potential) reads and writes to the channel. Consider dead locks, race conditions, hanged/leaking goroutines, etc.

## Creating a buffered channel
Consider making 0 or 1 length channel. There are actually very few applications for buffered channels (limiting concurrency is one of them). In most cases channel will either always be empty (reads faster than writes) or full (writes faster than reads), so there is no point in keeping a buffered channel.

## Closing a channel
Ensure that channel closes only once. In situations with a possible concurrent close, channel should be protected by a sync primitive. Using `sync.Once` is a good option.

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
Check for syncronizations primitives (channels, mutexes and alike) defined in the structure. New ones should be created for the new structure.

{{< highlight go >}}
type MyStruct struct {
	lock sync.Mutex
} 

// . . .

s := MyStruct{}
// The two structs now share the same mutex which is not the desired result.
s2 := s
{{< / highlight >}}

## Returning an error
Check if the client actually can handle (or cares about) this error. If the answer is "probably not" then you should consider handling the error yourself (for example logging).

## Defining an exported type
Check if the type is intended for external use. If the answer is "no" or "not yet" then make it unexported. Premature exporting leads to interface pollution.

