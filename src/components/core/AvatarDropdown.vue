<template>
	<DropdownMenuRoot>
		<DropdownMenuTrigger
			class="border border-dark flex gap-2.5 items-center py-2.5 px-3 rounded-md"
			aria-label="Customise options"
		>
			<Avatar :src="user!.photoURL" :name="user!.displayName" :size="28" />
			<span class="text-sm">	{{ user!.displayName }}</span>
		</DropdownMenuTrigger>
		<DropdownMenuPortal>
			<DropdownMenuContent
				class="w-[154px]  p-4 border border-dark rounded-md shadow-lg bg-light mt-2"
			>
				<DropdownMenuItem
					value="LogOut" class="hover:bg-grey p-1 px-2 rounded-md text-red cursor-pointer" @click="useSignin().signOut()">
					Log Out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenuPortal>
	</DropdownMenuRoot>
</template>

<script setup lang="ts">

import {
  DropdownMenuArrow,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuItemIndicator,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuRoot,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from 'radix-vue'
import { useSignin } from '@/composables/auth/auth'
import { useUser } from '@/composables/auth/user'

const { user } = useUser()


</script>

<style scoped>

</style>
