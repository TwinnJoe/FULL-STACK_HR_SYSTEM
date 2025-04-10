<template>
  <router-view />
</template>

<style>
/* Mobile (default) */
.container {
  display: flex;
  flex-direction: column; /* Stack items vertically */
  gap: 1rem;
}

/* Tablet */
@media (min-width: 600px) and (max-width: 1023px) {
  .container {
    flex-direction: column; /* Keep stacking vertically */
  }
}

/* Laptop */
@media (min-width: 1024px) and (max-width: 1440px) {
  .container {
    flex-direction: row; /* Align items horizontally on laptops */
    gap: 2rem;
  }
}

/* Desktop */
@media (min-width: 1441px) {
  .container {
    flex-direction: row;
    gap: 3rem; /* Larger gap on desktop */
  }
}

</style>
