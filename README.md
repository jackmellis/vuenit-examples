# Vuenit Examples
This repository contains a number of use cases for Vuenit, showcasing some of its more unique features.

## Basic
An example of testing that a component renders correctly. Demonstrates `mount` and `$contains`.  
[source](src/components/basic.vue)  
[test](spec/components/basic.spec.js)

## Data
This test shows how you can easily test computed values, get, set, and update **prop** values.  
[source](src/components/data.vue)  
[test](spec/components/data.spec.js)

## Slots
Many components will have different behaviour or render different content when slots are present. Vuenit has a simple way to insert slot content into your tests.  
[source](src/components/slots.vue)  
[test](spec/components/slots.spec.js)

## Shallow Rendering
Often your component will have multiple nested child components that you don't want to have to set up and cater for. Vuenit can stub all child components and even provide custom templates for certain components.  
[source](src/components/deep-parent.vue)  
[test](spec/components/shallow-render.spec.js)

## Store
It's quite common for your component's data to come from a Vuex store. Vuenit includes a lightweight mock of Vuex that you can quickly insert into your component to aid testing.  
[source](src/components/store.vue)  
[test](spec/components/store.spec.js)

## Form Example
This example tests a relatively simple component: a user can input a value, click on a submit button, send an API request, and update a Vuex store. This shows how tackle these different parts using Vuenit.  
[source](src/components/create-a-thing.vue)  
[test](spec/components/create-a-thing.spec.js)

## Vuex
Testing Vuex modules is nice and easy with Vuenit's mock store library:  
[source](src/store/modules.js)  
[getters](spec/store/getters.spec.js)  
[mutations](spec/store/mutations.spec.js)  
[actions](spec/store/actions.spec.js)  
