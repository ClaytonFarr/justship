<script lang="ts">
  interface Props {
    strokeWidthClass?: string;
    strokeColorClass?: string;
    additionalClasses: string;
  }

  let { strokeWidthClass = 'stroke-1', strokeColorClass = 'stroke-gray-500', additionalClasses }: Props = $props();
</script>

<template lang="pug">
  svg(class='{strokeWidthClass} {strokeColorClass} {additionalClasses}', aria-hidden='true')
    defs
      pattern#0787a7c5-978c-4f66-83c7-11c213f99cb7(width='200', height='200', x='50%', y='-1', patternUnits='userSpaceOnUse')
        path(d='M.5 200V.5H200', fill='none')
    rect(width='100%', height='100%', stroke-width='0', fill='url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)')
    
</template>
