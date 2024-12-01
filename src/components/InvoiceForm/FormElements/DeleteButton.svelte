<button class="group" on:click>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 2 2"
      class="w-6 h-6"
    >
      <!-- Circle with Tailwind styling -->
      <circle
        cx="1"
        cy="1"
        r="1"
        class="fill-white group-hover:fill-red-600 transition-colors"
      />
      <!-- First diagonal line -->
      <polyline
        points="0.5,0.5 1.5,1.5"
        class="fill-none stroke-gray-900 stroke-[0.135] stroke-linecap-round group-hover:stroke-white transition-colors"
      />
      <!-- Second diagonal line -->
      <polyline
        points="0.5,1.5 1.5,0.5"
        class="fill-none stroke-gray-900 stroke-[0.135] stroke-linecap-round group-hover:stroke-white transition-colors"
      />
    </svg>
  </button>
  