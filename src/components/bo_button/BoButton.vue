<template>
	<button
		:type="type"
		:class="buttonClasses"
		:disabled="disabled || isLoading"
		:aria-disabled="disabled || isLoading"
		:aria-readonly="isLoading || disabled"
	>
		<span class="bo-button__content inline-flex items-center justify-center">
			<bo-icon
				v-if="prefixIcon !== Icon.none || iconOnlyButton"
				:icon="iconOnlyIcon"
				:size="size"
				class="bo-button__prefix-icon mr-1.5"
			/>
			<bo-text
				v-if="!!label && !iconOnlyButton"
				:text="label"
				:clickable="true"
				:weight="BoFontWeight.medium"
				:size="buttonFontSize"
				class="bo-button__label"
			/>
			<bo-icon
				v-if="
					suffixIcon !== Icon.none &&
					suffixIcon != null &&
					!isLoading &&
					!iconOnlyButton
				"
				:icon="suffixIcon"
				:size="size"
				class="bo-button__suffix-icon ml-1.5"
			/>
			<bo-loading-spinner
				v-if="isLoading"
				:size="loaderSize"
				:variant="loaderVariant"
				class="ml-2"
			/>
		</span>
	</button>
</template>

<script setup lang="ts">
import { BoIcon, Icon } from '@/components/bo_icon'
import { BoLoadingSpinner } from '@/components/bo_loading_spinner'
import { BoFontSize, BoFontWeight, BoText } from '@/components/bo_text'
import { BoSize } from '@/data/bo_size.constant'
import { BoLoaderVariant } from '@/data/loader.constant'
import { HtmlButtonType } from '@/global/html_button'
import { StringUtils, TailwindUtils } from '@/utils'
import { computed, toRefs } from 'vue'
import { BoButtonShape, BoButtonVariant } from './constants'
import type { BoButtonProps } from './types'

const props = withDefaults(defineProps<BoButtonProps>(), {
	loaderType: 'spinner',
	size: () => BoSize.default,
	prefixIcon: () => Icon.none,
	suffixIcon: () => Icon.none,
	linkVariantWithShadow: false,
	type: () => HtmlButtonType.button,
	shape: () => BoButtonShape.default,
	variant: () => BoButtonVariant.primary,
})

const {
	label,
	type,
	variant,
	size,
	prefixIcon,
	suffixIcon,
	shape,
	linkVariantWithShadow,
	disabled,
	isLoading,
} = toRefs(props)

const defaultClasses: string =
	/*tw*/ 'bo-button inline-flex items-center justify-center cursor-pointer'

const disabledClasses: string =
	/*tw*/ 'disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none'

const iconOnlyButton = computed<boolean>(() => {
	return (
		StringUtils.isEmptyStr(label.value) &&
		prefixIcon.value !== null &&
		prefixIcon.value !== undefined &&
		prefixIcon.value !== Icon.none
	)
})

const iconOnlyIcon = computed<Icon>(() => {
	if (iconOnlyButton.value) {
		return prefixIcon.value ?? suffixIcon.value ?? Icon.none
	}

	if (prefixIcon.value != null) {
		return prefixIcon.value
	}

	return Icon.none
})

const buttonShapeClasses = computed<string>(() => {
	switch (shape.value) {
		case BoButtonShape.pill:
			return /*tw*/ 'rounded-full'
		case BoButtonShape.outline:
		case BoButtonShape.default:
		default:
			if (size.value === BoSize.extra_small) {
				return /*tw*/ 'rounded-md'
			} else {
				return /*tw*/ 'rounded-lg'
			}
	}
})

const buttonVariantClasses = computed<string>(() => {
	switch (shape.value) {
		case BoButtonShape.outline:
			switch (variant.value) {
				case BoButtonVariant.primary:
					return /*tw*/ 'border border-blue-500 hover:bg-blue-700 focus:ring-transparent text-blue-500 hover:text-white'
				case BoButtonVariant.secondary:
					return /*tw*/ 'border border-gray-600 hover:bg-gray-400 focus:ring-transparent text-gray-400 hover:text-white'
				case BoButtonVariant.danger:
					return /*tw*/ 'border border-red-600 hover:bg-red-600 focus:ring-transparent text-red-600 hover:text-white'
				case BoButtonVariant.warning:
					return /*tw*/ 'border border-yellow-500 hover:bg-yellow-500 focus:ring-transparent text-yellow-500 hover:text-white'
				case BoButtonVariant.success:
					return /*tw*/ 'border border-green-600 hover:bg-green-600 focus:ring-transparent text-green-600 hover:text-white'
				case BoButtonVariant.dark:
					return /*tw*/ 'border border-black hover:bg-black focus:ring-transparent text-black hover:text-white'
				case BoButtonVariant.link:
					return /*tw*/ 'bg-transparent hover:bg-transparent focus:ring-transparent text-blue-500 hover:text-blue-700'
				case BoButtonVariant.link_secondary:
					return /*tw*/ 'bg-transparent hover:bg-transparent focus:ring-transparent text-blue-500 hover:text-blue-700'
				case BoButtonVariant.link_danger:
					return /*tw*/ 'bg-transparent hover:bg-transparent focus:ring-transparent text-red-600 hover:text-red-700'
				case BoButtonVariant.link_warning:
					return /*tw*/ 'bg-transparent hover:bg-transparent focus:ring-transparent text-yellow-500 hover:text-yellow-700'
				case BoButtonVariant.link_success:
					return /*tw*/ 'bg-transparent hover:bg-transparent focus:ring-transparent text-green-600 hover:text-green-700'
				case BoButtonVariant.link_dark:
					return /*tw*/ 'bg-transparent hover:bg-transparent focus:ring-transparent text-black hover:text-black/50'
				default:
					return /*tw*/ 'border border-blue-600 hover:bg-blue-400 focus:ring-transparent text-blue-600 hover:text-white'
			}
		case BoButtonShape.pill:
		case BoButtonShape.default:
		default:
			switch (variant.value) {
				case BoButtonVariant.primary:
					return /*tw*/ 'bg-blue-600 hover:bg-blue-700 focus:ring-transparent text-white'
				case BoButtonVariant.secondary:
					return /*tw*/ 'bg-gray-400 hover:bg-gray-700 focus:ring-transparent text-white'
				case BoButtonVariant.danger:
					return /*tw*/ 'bg-red-600 hover:bg-red-700 focus:ring-transparent text-white'
				case BoButtonVariant.warning:
					return /*tw*/ 'bg-yellow-500 hover:bg-yellow-700 focus:ring-transparent text-white'
				case BoButtonVariant.success:
					return /*tw*/ 'bg-green-600 hover:bg-green-700 focus:ring-transparent text-white'
				case BoButtonVariant.dark:
					return /*tw*/ 'bg-black hover:bg-black/50 focus:ring-transparent text-white'
				case BoButtonVariant.link:
					return /*tw*/ 'bg-transparent hover:bg-transparent focus:ring-transparent text-blue-500 hover:text-blue-700'
				case BoButtonVariant.link_secondary:
					return /*tw*/ 'bg-transparent hover:bg-transparent focus:ring-transparent text-gray-600 hover:text-gray-700'
				case BoButtonVariant.link_danger:
					return /*tw*/ 'bg-transparent hover:bg-transparent focus:ring-transparent text-red-600 hover:text-red-700'
				case BoButtonVariant.link_warning:
					return /*tw*/ 'bg-transparent hover:bg-transparent focus:ring-transparent text-yellow-500 hover:text-yellow-700'
				case BoButtonVariant.link_success:
					return /*tw*/ 'bg-transparent hover:bg-transparent focus:ring-transparent text-green-600 hover:text-green-700'
				case BoButtonVariant.link_dark:
					return /*tw*/ 'bg-transparent hover:bg-transparent focus:ring-transparent text-black hover:text-black/50'
				default:
					return /*tw*/ 'bg-blue-600 hover:bg-blue-700 focus:ring-transparent text-white'
			}
	}
})

const buttonVariantShadowClasses = computed<string>(() => {
	switch (variant.value) {
		case BoButtonVariant.link:
		case BoButtonVariant.link_secondary:
		case BoButtonVariant.link_danger:
		case BoButtonVariant.link_warning:
		case BoButtonVariant.link_success:
		case BoButtonVariant.link_dark:
			switch (linkVariantWithShadow.value) {
				case false:
					return /*tw*/ 'shadow-none'
				case true:
				default:
					return /*tw*/ 'shadow-md'
			}
		case BoButtonVariant.primary:
		case BoButtonVariant.secondary:
		case BoButtonVariant.danger:
		case BoButtonVariant.warning:
		case BoButtonVariant.success:
		case BoButtonVariant.dark:
		default:
			return /*tw*/ 'shadow-lg inset-shadow-sm inset-shadow-white/20'
	}
})

const buttonClasses = computed<string>(() => {
	return TailwindUtils.merge(
		defaultClasses,
		disabledClasses,
		buttonSizeClasses.value,
		buttonShapeClasses.value,
		buttonVariantClasses.value,
		buttonVariantShadowClasses.value,
	)
})

const buttonFontSize = computed<BoFontSize>(() => {
	switch (size.value) {
		case BoSize.extra_small:
			return BoFontSize.xs
		case BoSize.small:
			return BoFontSize.sm
		case BoSize.large:
			return BoFontSize.lg
		case BoSize.extra_large:
			return BoFontSize.xl
		case BoSize.default:
		default:
			return BoFontSize.base
	}
})

const buttonSizeClasses = computed<string>(() => {
	switch (iconOnlyButton.value) {
		case true:
			switch (size.value) {
				case BoSize.extra_small:
					return /*tw*/ 'w-[16px] h-[16px]'
				case BoSize.small:
					return /*tw*/ 'w-[24px] h-[24px]'
				case BoSize.default:
				default:
					return /*tw*/ 'w-[32px] h-[32px]'
				case BoSize.large:
					return /*tw*/ 'w-[40px] h-[40px]'
				case BoSize.extra_large:
					return /*tw*/ 'w-[48px] h-[48px]'
			}
		default:
			switch (size.value) {
				case BoSize.extra_small:
					return /*tw*/ 'h-[16px] px-[4px]'
				case BoSize.small:
					return /*tw*/ 'h-[24px] px-[8px]'
				case BoSize.default:
				default:
					return /*tw*/ 'h-[32px] px-[12px]'
				case BoSize.large:
					return /*tw*/ 'h-[40px] px-[16px]'
				case BoSize.extra_large:
					return /*tw*/ 'h-[48px] px-[20px]'
			}
	}
})

const loaderVariant = computed<BoLoaderVariant>(() => {
	switch (shape.value) {
		case BoButtonShape.outline:
			switch (variant.value) {
				case BoButtonVariant.secondary:
					return BoLoaderVariant.secondary
				case BoButtonVariant.danger:
					return BoLoaderVariant.danger
				case BoButtonVariant.warning:
					return BoLoaderVariant.warning
				case BoButtonVariant.success:
					return BoLoaderVariant.success
				case BoButtonVariant.dark:
					return BoLoaderVariant.dark
				case BoButtonVariant.primary:
				default:
					return BoLoaderVariant.primary
			}
		case BoButtonShape.default:
		case BoButtonShape.pill:
		default:
			switch (variant.value) {
				case BoButtonVariant.link:
					return BoLoaderVariant.primary
				case BoButtonVariant.primary:
				case BoButtonVariant.secondary:
				case BoButtonVariant.danger:
				case BoButtonVariant.warning:
				case BoButtonVariant.success:
				case BoButtonVariant.dark:
				default:
					return BoLoaderVariant.white
			}
	}
})

const loaderSize = computed<BoSize>(() => {
	switch (size.value) {
		case BoSize.extra_small:
		case BoSize.small:
			return BoSize.extra_small
		case BoSize.default:
		case BoSize.large:
		case BoSize.extra_large:
		default:
			return BoSize.default
	}
})
</script>
