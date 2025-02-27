import { Button, Form, messageSuccess, messageError } from '@ui-components'
import Link from 'next/link'
import { useState } from 'react'
import { profileService } from '@/services/profile'

export default function PasswordTab() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Current password is required'
    }
    
    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required'
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters long'
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your new password'
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsLoading(true)
    
    try {
      await profileService.updatePassword(formData)
      messageSuccess('Password updated successfully')
      
      // Reset form
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      })
    } catch (error: any) {
      console.error('Failed to update password:', error)
      
      if (error.response?.data?.message === 'Current password is incorrect') {
        setErrors({ currentPassword: 'Current password is incorrect' })
      } else {
        messageError('Failed to update password')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8">
      <p className="text-gray-500 mb-8">
        Enter your current password to change your password.
      </p>

      <Form.Input
        title="Current password"
        name="currentPassword"
        type="password"
        value={formData.currentPassword}
        onChange={handleChange}
        className="mb-4"
        error={errors.currentPassword}
      />

      <Form.Input
        title="New password"
        name="newPassword"
        type="password"
        value={formData.newPassword}
        onChange={handleChange}
        className="mb-4"
        error={errors.newPassword}
      />

      <Form.Input
        title="Confirm new password"
        name="confirmPassword"
        type="password"
        value={formData.confirmPassword}
        onChange={handleChange}
        className="mb-6"
        error={errors.confirmPassword}
      />

      <div className="flex justify-end gap-3">
        <Link href="/">
          <Button size="md" title="Back" />
        </Link>
        <Button 
          primary 
          size="md" 
          title="Update password" 
          type="submit"
          loading={isLoading}
          disabled={isLoading}
        />
      </div>
    </form>
  )
}
