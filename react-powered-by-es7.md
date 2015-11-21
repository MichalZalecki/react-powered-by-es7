# React powered by ES7

I am going to show you how you can use **ECMAScript 7** to give your React components a few new superpowers. I will assume you know the ECMAScript 6 and I wont be digging into class syntax or arrow functions.

ECMAScript 7 is the next stage in evolution of ECMA-262 standard (aka **JavaScript**). Some of its features had been proposed before ECMAScript 6 was finalized. Support for ES7 is not good enough to use ES7 in production code. Oh... is it? 

You should not, basically you cannot, use ES7 and count on native support but this does not mean you have to wait for it. In woumedia we write ES7 code thanks to Babel which provides us pretty decent *support* for ES7 right now doing ES7 to ES5 transpilation.

Here are some nice ES7 features you can use along with React to level up your codebase.

## Class Properties

Class property is defined within class definition and is available on object instance. Adding `static` keyword will make property available on class function which make it possible to be used outside the instance context.

```javascript
class Time extends React.Component {
  DATE_FORMAT = "MMMM Do YYYY, h:mm:ss a";

  getDate() {
    return moment(this.props.date).format(this.DATE_FORMAT);
  }
  //...
}
```

```javascript
class Time extends React.Component {
  static DATE_FORMAT = "MMMM Do YYYY, h:mm:ss a";

  getDate() {
    return moment(this.props.date).format(Time.DATE_FORMAT);
  }
  //...
}

Time.DATE_FORMAT // "MMMM Do YYYY, h:mm:ss a"
```

## Do Expression

In JavaScript, unlike in Ruby, `if` is a statement not an expression. That means it cannot return any values. We can change this behavior with `do` block which changes statements behavior to act as expression with implicit return. Just like in Ruby! `do` especially comes in handy when used inside `jsx` templates. Although `jsx` looks like template language it won't be parsed. In the end `jsx` is converted (e.g. using Babel [react preset](https://babeljs.io/docs/plugins/preset-react/)) to nested function calls. This is the basic thing you should understand about `jsx`. That is why we cannot use `if` and other statements within `jsx` without writing `do` around them.

```html
<div className="do-expression">
  { do {
    if (this.props.enabled) {
      <button onClick={ this.disable }>Disable</button>
    } else {
      <button onClick={ this.enable }>Enable</button>
    }
  } }
</div>
```

## Object Rest Properties

Thanks to object rest properties we can collect all attributes which has *left* after destructing the object. The new object is created and contains all properties which wasn't extracted during destructing. We can use it as a native alternative for `_.omit`.

```javascript
class RestProperties extends React.Component {
  getListItems() {
    const { style, ...data } = this.props;
    return Object.keys(data).map(key =>
      <li key={ key }>
        { changeCase.titleCase(key) }: <strong>{ data[key] }</strong>
      </li>
    );
  }
  // ...
}
```

## Object Spread Properties

We can use object spread properties to achieve object concatenation and avoid unnecessary state mutation which takes place when using `Object.assign({}, ...)`. It is the reverse of object rest properties. Moreover spread operator `...` is much nicer than method call and encourages **immutability**.

```javascript
class SpreadProperties extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: ["orange", "purple","black"],
      ...ColorsStore.getState(),
    };
    // ...
  }

  getListItems() {
    return this.state.colors
      .filter(this._colorFilter)
      .map(color => <li key={ color } style={ { color } }>{ color }</li> );
  }
  // ...
}
```

```javascript
// ...

handleFetchSuccess(user) {
  const langs = _.pairs(([for ({ language } of user.repos) language])
    .filter(this._castToBool)
    .reduce(this._reduceToCountLangs, {}))
    .map(this._mapToNameCount)
    .sort(this._sortByCount);

  this.setState({ user: { ...user, langs, loading: false, error: null } });
}
// ...
```

## Async Functions

Async function is the game changer when it comes to dealing witch the asynchronous code. Thanks to `async` and `await` we can write asynchronous code in the synchronous manner. Awaiting for **promise** stops function execution until the promise is resolved. Such code is easier to read and maintain than promise chain. Moreover we can use `try {...} catch (e) { ... }` to handle exceptions which is not possible with and *old school* asynchronous code!

```javascript
class UsersActions {
  // ...
  async fetch(username) {
    this.dispatch();
    try {
      const { data: { name, repos_url } } = await axios.get(`https://api.github.com/users/${username}`);
      const { data: repos }               = await axios.get(repos_url);

      this.actions.fetchSuccess({ name, repos });
    } catch(e) {
      this.actions.fetchFail(e);
    }
  }
}
```

Although similar implementation in ES6 is possible using generators, you need more boilerplate and *runner* function. You can find more complex implementations of `run` function in [asynquence](https://github.com/getify/asynquence), [co](https://github.com/tj/co) or [task.js](http://taskjs.org/). On [David Walsh Blog](https://davidwalsh.name/async-generators) you can read more about async generators.

```javascript
function run(g) {
  const it = g();

  (function _iterate(res) {

    !res.done && res.value
      .then(data => _iterate(it.next(data)))
      .catch(data => it.throw(data));

  })(it.next());
}

fetch(username)  {
  run((function*() {
    this.dispatch();
    try {
      const { data: { name, repos_url } } = yield axios.get(`https://api.github.com/users/${username}`);
      const { data: repos }               = yield axios.get(repos_url);

      this.actions.fetchSuccess({ name, repos });
    } catch (e) {
      this.actions.fetchFail(e);
    }
  }).bind(this));
}
```

## Class Decorators

Class decorators gives us the ability to customize class (constructor) via its prototype. For example we can reuse common methods among components without the need to introduce inheritance. Class decorator accepts only one argument which is class function.

```javascript
function classDecorator(constructor) {
  console.log(arguments); // [ Decorators(props) ]
};

function handleInputChange(constructor) {
  constructor.prototype.handleInputChange = function handleInputChange({ target }) {
    this.setState({ [target.name]: target.value });
  };
}
```

```javascript
@classDecorator
@handleInputChange
class Decorators extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "FooBar",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }
  // ...
}
```

```html
<div className="decorators">
  <h1>{ this.state.name }</h1>
  <input
    type="text"
    name="name"
    value={ this.state.name }
    onChange={ this.handleInputChange }
  />
</div>
```

## Property Decorators

Property decorator is powerful tool due to its ability to modify the target properties (class methods in this case) and access their descriptor (look at [Object.defineProperty()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) to read more about property descriptor). We can use property descriptor to change methods behavior.

```javascript
function propertyDecorator(target, name, descriptor) {
  console.log(this, arguments);
};

function countCalls(target, name, descriptor) {
  const method = descriptor.value;

  descriptor.value = function (...args) {
    this[`${name}_counter`] = (this[`${name}_counter`] || 0) + 1;
    return method.apply(this, args);
  };
};
```

```javascript
class Decorators extends React.Component {
  // ...
  @propertyDecorator
  @countCalls
  render() {
    return template.call(this);
  }
}
```

## Just a hype or production ready?

Although ES7 is still developing standard, there is no danger of using it today. Possible issue is that the standard you have already implemented will change. When this is the case you have two options. 

The sooner you update your code to match new standard the better and this is the path I would choose. Following this path is not a developer caprice but more like library update to keep things up-to-date and not submerge your project in a deprecated code.

Being up-to-date with the new standard is also beneficial to you developer skills and in spirit of open source as long as you share your experience with the community so you can always give something back.

On the other hand you do not have to update your version of Babel rigt after new version has been published. Do this after appropriate resources will be available for project you working on. That basically gives you a feature frozen and stable environment with every Babel release!


