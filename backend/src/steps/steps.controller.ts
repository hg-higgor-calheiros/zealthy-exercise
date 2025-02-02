import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Post,
  Delete,
} from '@nestjs/common';
import { StepsService } from './steps.service';
import { UpdateStepDto } from './dto/update-step.dto';
import { CreateStepDto } from './dto/create-step.dto';

@Controller('steps')
export class StepsController {
  constructor(private readonly stepsService: StepsService) {}

  @Get()
  findAll() {
    return this.stepsService.findAll();
  }

  @Post()
  create(@Body() createStep: CreateStepDto) {
    return this.stepsService.create(createStep);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStepDto: UpdateStepDto) {
    return this.stepsService.update(+id, updateStepDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stepsService.delete(+id);
  }
}
